using JSON

include("npc-json.jl")
include("npc-split.jl")
include("npc-read.jl")
include("npc-parse.jl")

config = read_config("config/npc_config_html.json")
npc = read_npc("npc/specific/Ludo.npc", config.inputSettings)

d = npc[53]
mp = config.mappings[38]
pSettings = config.parseSettings
parse_content(d, mp, pSettings)