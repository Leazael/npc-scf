# Create the struct and functions to load the .npc files.
struct NpcLine
    content::String 
    table::Vector{String}
end
NpcLine(s::AbstractString) = NpcLine(s, String[])
hastable(d::NpcLine) = !isempty(d.table)

function concatenate(inSettings::InputSettings, l1::NpcLine, l2::NpcLine)
    for c in inSettings.concatenators 
        str1 = match_last(c.match, l1.content, c.remove)
        if isnothing(str1)
            continue
        end
        str1 = c.addWhitespace ? str1 * " " : str1
        return NpcLine(str1 * l2.content)
    end
    return nothing
end

find_row(inSettings::InputSettings, ll::NpcLine) = match_first(inSettings.row, ll.content, true)

# only keep characters to the left of any comment 
comment(str::Match, inSettings::InputSettings) = split(str, rex(inSettings.comment); limit = 2) |> first |> strip

function read_npc(fileLoc::AbstractString, inSettings::InputSettings)
    data = NpcLine[] # read the data line by line, with commenting and pruning.
    for str in eachline(fileLoc)
        str = comment(str, inSettings)
        if !isempty(str)
            push!(data, NpcLine(str))
        end
    end

    k = 2
    while k ≤ length(data) # concantenate lines that need concatenating.
        res = concatenate(inSettings, data[k-1], data[k])
        if isnothing(res) # no concantenation
            k += 1
        else 
            data[k-1] = res
            deleteat!(data, k)
        end
    end

    k = 2
    while k ≤ length(data) # it the line is part of a row, add it to the previous entry table
        res = find_row(inSettings, data[k])
        if isnothing(res) #does not start with a row-char.
            k += 1
        else
            push!(data[k-1].table, res)
            deleteat!(data, k)
        end
    end

    return data
end