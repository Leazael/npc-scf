using JSON3
include("npc-json.jl")
include("npc-split.jl")
include("npc-read.jl")
include("npc-parse.jl")

# config = read_config("config/npc_config_html.json")
# npc = read_npc("npc/example.npc", config.inputSettings)
# parse_npc(config, npc, "js/npc.js")

parse_npc("config/npc_config_html.json", "npc/example.npc", "html/example.js")

parse_npc("config/npc_config_tex.json", "npc/example.npc", "tex/example.tex")


