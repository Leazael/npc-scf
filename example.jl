
push!(LOAD_PATH, "src");
using NPCScf

parse_npc("config/npc_config_html.json", "npc/example.npc", "html/example.js")
parse_npc("config/npc_config_tex.json", "npc/example.npc", "tex/example.tex")