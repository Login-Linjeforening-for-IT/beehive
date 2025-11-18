vcl 4.0;

backend default {
    .host = "127.0.0.1";
    .port = "3001";
}

sub vcl_recv {
    if (req.http.Cookie) {
        set req.http.X-Theme = regsub(req.http.Cookie, ".*theme=([^;]+);?.*", "\1");
        set req.http.X-Lang = regsub(req.http.Cookie, ".*lang=([^;]+);?.*", "\1");
    }

    if (req.url ~ "^/_next/image") {
        set req.http.X-Theme = "";
        set req.http.X-Lang = "";
    }

    return (hash);
}

sub vcl_hash {
    # Hashes the theme and language
    hash_data(req.http.X-Theme + req.http.X-Lang);
}

sub vcl_backend_response {
    if (bereq.url ~ "^/_next/image") {
        set beresp.ttl = 24h;
        if (beresp.http.Set-Cookie) {
            unset beresp.http.Set-Cookie;
        }
        set beresp.http.Cache-Control = "public, max-age=86400, s-maxage=86400";
        return (deliver);
    }

    set beresp.ttl = 1m;
    return (deliver);
}

sub vcl_deliver {
    if (obj.hits > 0) {
        set resp.http.X-Cache = "HIT:" + obj.hits;
    } else {
        set resp.http.X-Cache = "MISS";
    }

    return (deliver);
}
