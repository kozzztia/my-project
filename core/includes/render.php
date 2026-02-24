<?php

if(!defined('ABSPATH')){exit;}

function get_url_segments(?string $uri = null): ?array {

    if(!isset($_SERVER['REQUEST_URI']) || !$_SERVER['REQUEST_URI']){
        return null;
    }

    if(!($parsed_url = parse_url($_SERVER['REQUEST_URI']))){
        return null;
    }

    if(empty($url_segments = explode('/', trim($parsed_url['path'], '/')))){
        return null;
    }

    return $url_segments;

}

if ($url_segments = get_url_segments()) {

    // check for last slash
    if(
        !empty($url_segments[0])
        &&
        empty($_GET)
        &&
        substr($_SERVER['REQUEST_URI'], -1) !== '/'
    ){
        header("Location: " . HOME_URL . trim($_SERVER['REQUEST_URI'], '/') . '/', true, 301);
        exit;
    }

    list($template, $context) = router($url_segments);

    // render
    echo get_template($template, $context);

}
