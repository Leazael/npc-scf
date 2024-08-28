
function match_first(mt::Match, s::AbstractString, remove::Bool)
    rx = rex(mt)
    if !startswith(s, rx)
        return nothing 
    end
    m = match(rx, s)[1]
    return strip(remove ? s[length(m)+1:end] : s)
end

function match_last(mt::Match, s::AbstractString, remove::Bool)
    rx = rex(mt)
    if !endswith(s, rx)
        return nothing 
    end
    m = match(r".*" * rx, s)[1]
    return strip(remove ? s[1:end-length(m)] : s)
end

function match_split(mm::Vector{Match}, s::AbstractString; fromstart::Bool = false, repeat::Bool = false, discardmatch = false) 
    if repeat #if the match is repeated, and of length 1 then a workaround is needed
        m = length(mm) == 1 ? match(r"(.*)", s) : match(rex(mm[1:end-1]), s)
    else 
        m = match(rex(mm), s)
    end

    if isnothing(m)
        return nothing 
    end

    ss = strip.(string.(m |> collect))

    if discardmatch # discard entries containing the keywords/matches
        deleteat!(ss, 2:2:length(ss))
    end

    if fromstart # check if the string started with a match by checking if ss[1] is emtpy.
        if isempty(ss[1])
            deleteat!(ss, 1)
        else
            return nothing 
        end
    end
    
    if repeat #if true, split using the last match.
        append!(ss, split(pop!(ss), rex(mm[end])))
    end
    
    return ss
end