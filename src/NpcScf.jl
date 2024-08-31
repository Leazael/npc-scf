module NpcScf 
    using JSON3

    export parse_npc

    include("npc-json.jl")
    include("npc-split.jl")
    include("npc-read.jl")
    include("npc-parse.jl")
end