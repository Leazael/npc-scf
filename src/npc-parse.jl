function parse_content(d::NpcLine, mp::Mapping, pSettings::ParseSettings)
    result = match_split(mp.pattern, d.content; fromstart = true)
    if isnothing(result) || istable(mp) != hastable(d) # There is no match.
        return nothing 
    end
    result[:] = match_strip(result, mp.stripChars)

    # if the match is a keyword (i.e., starts with !), then strip the keyword 
    # otherwise, throw it out.

    isKw = map(k -> startswith(result[k], rex(pSettings.keyword)), 1:length(result))
    isMatch = map(isodd, 1:length(result))

    result[isKw .&& isMatch] = match_strip(result[isKw .&& isMatch], pSettings.keyword) # Strip keywords of the !
    deleteat!(result, (.!isKw) .&&  isMatch) # delete non-keyword matches.
    
    return result
end

function parse_table(r::AbstractString, mp::Mapping, pSettings::ParseSettings)
    result = match_split(mp.table.delimiters, r; repeat = mp.table.repeat, discardmatch = true)

    if isnothing(result)
        throw(DomainError((r, mp), "Given row does not match the pattern of delimiters."))
    end

    return join( match_strip(result, mp.stripChars), pSettings.tableColDelim) # delimiters are not passed on.
end
parse_table(d::NpcLine, mp::Mapping, pSettings::ParseSettings) = join(map(r -> parse_table(r, mp, pSettings), d.table), pSettings.tableRowDelim)

function replace_cmd(cmd::String, varStr::String, content::Vector{<:AbstractString})
    if any(c -> contains(c, varStr), content)
        error(".npc file cannot contain \"$(varStr)\"")
    end #make sure to reverse the replace to handle 2-digit numbers
    return replace(cmd, ["$(varStr)$k" => content[k] for k in reverse(eachindex(content))]...)
end

function parse_cmd(d::NpcLine, mappings::Vector{Mapping}, pSettings::ParseSettings)
    for mp in mappings
        content = parse_content(d, mp, pSettings)
        if !isnothing(content)
            cmd = replace_cmd(mp.cmd, pSettings.var, content)
            cmd = replace(cmd, pSettings.descriptionVar => mp.description)
            if istable(mp)
                tabContent = parse_table(d, mp, pSettings)
                cmd = replace(cmd, pSettings.tableVar => tabContent)
            end
            return cmd
        end
    end
end
parse_cmd(d::NpcLine, config::NpcConfig) = parse_cmd(d, config.mappings, config.parseSettings)


function parse_npc(config::NpcConfig, npc::Vector{NpcLine}, fileOut::String)
    open(fileOut, "w") do io 
        for d in npc
            println(io, parse_cmd(d, config))
        end
    end
end

function parse_npc(json::String, fileIn::String, fileOut::String)
    config = read_config(json)
    npc = read_npc(fileIn, config.inputSettings)
    parse_npc(config, npc, fileOut)
end
