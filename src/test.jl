using JSON3
include("npc-json.jl")
include("npc-split.jl")
include("npc-read.jl")
include("npc-parse.jl")

config = read_config("json/npc_config.json")
npc = read_npc("npc/Ludo.npc", config.inputSettings)

parse_npc(config, npc, "npc.js")
