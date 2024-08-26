# Create the structs and bindings for the JSON parsing.

const Match = Union{String,Vector{String}}
rex_str(m::Vector{String}) = "(\\Q" * join( escape_string.(m), "\\E|\\Q") * "\\E)"
rex_str(m::String) = rex_str([m])
rex(m::Match) = Regex(rex_str(m), "i")
rex(mm::Vector{Match}) = isempty(mm) ? Regex("()(.*)") :  Regex("(.*?)" * join(rex_str.(mm), "(.*)") * "(.*)", "i")
match_strip(s::AbstractString, m::Match) = strip(s, collect(join(m) * " "))
match_strip(ss::Vector{<:AbstractString}, m::Match) = map(s -> match_strip(s, m), ss)

struct Concatenator
    match::Match
    remove::Bool
    addWhitespace::Bool
end

struct InputSettings
    comment::Match
    row::Match
    concatenators::Vector{Concatenator}
end

struct ParseSettings
    keyword::Match
    var::String 
    tableVar::String
    tableColDelim::String
    tableRowDelim::String
end

struct TableSettings
    delimiters::Vector{Match}
    repeat::Bool 
    TableSettings(delim, repeat) = new(vcat(Match[], delim), repeat)
end  

struct Mapping
    description::String
    matchList::Vector{Match}
    cmd::String
    stripChars::Match
    table::Union{TableSettings, Nothing}
    function Mapping(description, matchList, cmd, stripChars, table)
        # println(description)
        return new(
            description,
            vcat(Match[], matchList),
            cmd,
            isnothing(stripChars) ? String[] : stripChars,
            table)
    end
end
istable(mp::Mapping) = !isnothing(mp.table)
istrivial(mp::Mapping) = isempty(mp.matchList)

struct NpcConfig
    inputSettings::InputSettings
    parseSettings::ParseSettings
    mappings::Vector{Mapping}
end

JSON3.StructType(::Type{<:NpcConfig}) = JSON3.Struct()
JSON3.StructType(::Type{<:Mapping}) = JSON3.Struct()
JSON3.StructType(::Type{<:Concatenator}) = JSON3.Struct()
JSON3.StructType(::Type{<:InputSettings}) = JSON3.Struct()
JSON3.StructType(::Type{<:ParseSettings}) = JSON3.Struct()

function read_config(fileLoc::AbstractString)
    json = open(fileLoc) do io
        JSON3.read(io, NpcConfig)
    end
    return json 
end