using JSON3
include("npc-json.jl")
include("npc-split.jl")
include("npc-read.jl")
include("npc-parse.jl")

config = read_config("json/npc_config.json")
npc = read_npc("test.npc", config.inputSettings)
parse_npc("json/npc_config.json", "test.npc", "npc.js")


