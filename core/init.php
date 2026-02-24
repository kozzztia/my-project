<?php

if(!defined('ABSPATH')){exit;}

/** custom print_r */
function pr($var) {

    echo "<textarea style='position: fixed; border: none; padding: 10px; opacity: 1; bottom:0; left:0; z-index:999999999; transform: translateZ(999999999px); display: block; width: 100%;height: 20%;overflow: auto; resize: none; background-color:#4b4b4b; color: #fff; border-top: solid 2px black;' onclick='$(this).select(); console.clear(); console.log($(this).val())'>";
    print_r($var);
    echo "</textarea>";

}

/** write log */
function write_log($log) {
    if (is_array($log) || is_object($log)) {
        error_log(print_r($log, true));
    } else {
        error_log($log);
    }
}

/** constants */
const DS = DIRECTORY_SEPARATOR;
const CORE_PATH = ABSPATH . DS . 'core';
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
$domain = $_SERVER['HTTP_HOST'] . '/';
define("HOME_URL", $protocol . $domain);
const SITE_CHARSET = 'UTF-8';
const HTML_LOC = 'en-US';

//remake
define("DATE_NOW", date('Ymd_Hi'));
//--------------------------------------------------------
const ASSETS_VERSION = '1.0.0-date-' . DATE_NOW;
const SVG_SPRITE_URL = HOME_URL . 'assets/svg/sprite.svg?ver=' . ASSETS_VERSION;
const SVG_FOLDER = HOME_URL . 'assets/svg/';
const IMG_FOLDER = HOME_URL . 'assets/img/';
const ASSETS_URL = HOME_URL . 'assets';
const MINIFY_HTML = false;
const TWIG_VIEWS_DIRNAME = 'views';

const SITE_NAME = 'my-project';

/** including core */
$includes = [
    'twig',               // twig
    'router',             // route url
    'render',             // render
];

foreach ($includes as $file) {
    require_once CORE_PATH . DS . 'includes' . DS . $file . '.php';
}
