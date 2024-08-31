
# npc-scf 

"Nonspecific Parsing Config for a Standardized Character Format".

The goals of this project are:
- Formulate a mark-down inspired mark-up language (the .npc format) that can describe character sheets in a plain-text format.
- Create an as-generic-as-possible structure that allows for the mapping from the .npc format to any other mark-up language (e.g., html/css or LaTeX).
- Write a Julia based parser that can, using the .json config file, create wrappers for the desired mark-up language.
- Provide libraries for both html/css and LaTeX to display the parsed wrapper code.
- Provide a generic test example.npc document that contains all documented behaviour of the parser.

# Parsing

The rules on how to parse a .npc file are described in the JSON config files. The general goal is to take a line like:

!AC 18, !Touch 13, !FlatFooted 16

and parse this into a function like 
- showAC(`18`, `13`, `16`) in the case of js wrappers.
- showAC{18}{13}{16} in the case of latex wrappers.

The showAC function will need to be defined in js/latex to display the desired statistics as desired.

## Matching

For each line in the .npc file, the parser will attempt to find, from a pre-defined list, a pattern matching the line.

| .npc code                             | matching pattern                      | Desired Strings after Parsing                 |
|---------------------------------------|---------------------------------------|-----------------------------------------------|
| !AC 18, !Touch 13, !FlatFooted 16     | ["!ac", "!touch", "!flatfooted"]      | "AC", "18", "Touch", "13", "FlatFooted", "16" |
| #Special Defences: Evasion            | ["#", ":"]                            | "Special Defences", "Evasion"                 |
| !Skills: Climb +3, Swim +1            | ["!Skills", [":", ";"]]               | "Skills", "Climb +3, Swim +1"                 |

In order to match with a pattern, the line .npc line must start with the first string in the pattern, and contain all subsequent strings in that order.

The matching is done case-insensitively, and where multiple strings are specified (such as the [":", ";"] in the third example), the matching is treated as a logical "OR".

If the pattern matches the line of the .npc code, the .npc code is split into substrings using the elements of the pattern as delimiters.

The strings in the pattern are discarded, unless they start with an "!". 
These strings are referred to as Keywords, and are passed along with the other substrings after parsing. 
In the first example, all words in the pattern are Keywords, and are passed along.
In the third example, the "Skills" is passed along, but the ":" is not, since it does not start with an "!" in the pattern.

Some further clean-up of the substrings (such as the removal of the "!" and other punctuation marks) is performed using the rules specified in "Mappings" object below.

## Commands 

The set of strings is mapped to a command that is defined in the Mappings object (see below). 

The defined command strings contain expressions of the form "var#1", "var#2", etc. 

During parsing, these strings will be replaced with the matches found in the pattern.

| Command string                        | after parsing with examples above.                    |
|---------------------------------------|-------------------------------------------------------|
| showAC(`var#2`, `var#4`, `var#6`)     | showAC(`18`, `13`, `16`)                            |
| description(`var#1`, `var#2`)         | description(`Special Defences`, `Evasion`)            |
| description(`var#1`, `var#2`)         | description(`Skills`, `Skills", "Climb +3, Swim +1`)  |

Note that different patterns can still use the same wrapper function (such as the skills and special defences example above).

The command can contain the following expressions:
- "var#n", with n=1, 2, ..., which will be replaced with the keywords and substrings found in the pattern.
- "dsc#", which will be replaced with a description of the found pattern (useful for automatic comments and debugging)
- "tab#", which will be replaced by a single string containing a cleaned up and parsed version of the table following the pattern. (See below.)

## Comments 

Comments can be added to the .npc file by adding a "//". All text on the line following (and including) the "//" is removed before further parsing.

## Concatenation 

During parsing, lines ending with a ",", "-" or "..." are considered to be unfinished.
In these cases, the subsequent line is added to the current line. This is done until no concatenators are left.

## Tables 

Some patterns can be used to define tables. In the .npc files, tables are indicated the usage of the ">" character, for example:

!Skills 
> Acrobatics:    +6 = 1 | +3 | +2 // The first row following the !Skills keyword
> Appraise:      +8 = 2 | +3 | +3 // The second row following the !Skills keyword
> Bluff:        +10 = 2 | +3 | +5 // The third row following the !Skills keyword

Here the keyword skills is followed by a table containing three rows. 
These rows are combined into a single large string according to the rules defined in the Mappings below and passed in the same way as the Keywords and Substrings.
In the example above, after parsing, the table is condensed to:

"Acrobatics||+6||1||+3||+2&&Appraise||+8||2||+3||+3&&Bluff||+10||2||+3||+5||"

This string will be substituted for "tab#" in the command string specified. It is up to the js/latex wrapper to properly handle this type of input.

## General Rules for Parsing 

- All lines are treated as a single block to be parsed. (With the exception of lines following concatenators, or preceded by the "row" characters. See below for more details.)
- All whitespace before and after the line is stripped.
- Pattern matching is done case-insensitively.
- All text between matches in a pattern are passed along for further mapping, along with any Keywords that may occur in the pattern.
- Not all instances of "var#n" need to be used in the command string.

# JSON Properties

All strings and examples above can be configured in the JSON config file.

We will give a detailed description of each setting here.

To see these settings "in action", refer to the "generic_example.npc" file.

## inputSettings

The input settings are used directly after reading the .npc file, but before the parsing.

With these settings, lines are concatenated, lines belonging to tables are identified, and commented-out text is removed.

### "comment" (default ["//"])
A list of strings that are treated as indicators of comments. 

All code after (and including) any of the strings defined in the array are treated as a comment and are ignored by the parser.

### "row" (default [">"])
A list of strings that are treated as row characters. 

A line starting with a row character (after whitespace stripping) is treated as a row in a table belonging to the first line above that does not start with a row character. 

### "concatenators" 

A concatenator defines how lines within the .npc file are concatenated.

The "match" described in each concatenator defines which characters are recognized as line-ending concatenators.

The "remove" option specifies if the concatenator itself is removed. (Yes for ellipses, no for other punctuation marks).

The "addWhiteSpace" option specifies if the concatenated lines are separated by a whitespace (yes for ellipses and commas, no for hyphens.)

## parseSettings

### "keyword" (default "!")

In patters, all strings starting with any of these strings are marked as keywords. 

This means that during parsing, these strings will be passed along with the other substrings in order to replace the var# strings. 

In this step, the keyword characters are stripped from the string. E.e., the keyword "!Skills" will be passed along as just "Skills".

### "var" (default "var#")

When substituting the keywords and substrings into the command string, these are the strings that are replaced. E.g.,

- "var#1" is replaced by the first Keyword/substring
- "var#n" is replaced by the nth Keyword/substring

### "tableVar" (default "tab#")

If the pattern is followed by a table, this string is replaced by the (processed) table.

### "descriptionVar" (default "dsc#")

This is replaced with the description of the mapping for which the pattern matches with the line in the .npc code.

Generally useful for automatic commenting and debugging.

### "tableColDelim" (default "||") and "tableRowDelim" (default "&&")

When parsing a table, the content of the columns is concantated with the tableColDelim. 

Subsequently, the rows are concatenated using the tableRowDelim.

See the example.npc or the table example above for exact usage.

## "mappings"

Each mapping must contain a description, a pattern and a command.

Each line in the .npc file is matched to one of the mappings in the list.

If a table is specified in the mapping, the pattern is only considered matching if the .npc line is followed by a table.

### "description"

Exactly what it says on the tin.  Can be parsed into the command string using "dsc#".

### "pattern"

The pattern that a .npc line must match. 

In order to match, the line must start with the first string in the pattern, and must then contain all subsequent strings in order.

When more than one string is used, then either of the two must match.

Using the strings in the pattern, the .npc line is split into substring.

The substrings, as well as any part of the pattern containing a Keyword, is passed along.

### "cmd"

A string in which the various variables get substituted for the strings that result from parsing. (See "var#" above.)

External js/latex/etc libraries will be responsible for the correct interpretation of the resulting command.

### stripChars

These characters get stripped from the front and end of each substring or keyword.

### table

If present, then the given mapping is interpreted as a table, and any .npc line must have a table attached in order to match.

The "delimiters" are a pattern at which the table is split into columns, and follows the same logic as "pattern" above. 
The delimiters are never keywords, and the row does not have to start with the first element. 

If "repeat" is set to true, then the last element of the "delimiters" list is repeated as often as needed.
