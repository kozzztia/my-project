<?php

if(!defined('ABSPATH')){exit;}

function router($url_segments = []){

    // building overall context
    $context = get_context();

    // body classes
    $body_classes = array('preload');

    if(!empty($url_segments)){

        if(empty($url_segments[0])){
            $body_classes[] = 'index';
            $template = 'index.twig';
            $context['page']['title'] = 'Index';
        } elseif(in_array($url_segments[0], get_allowed_templates())) {
            $context['page']['title'] = ucfirst($url_segments[0]);
            $template = $url_segments[0] . '.twig';

            if($url_segments[0] == 'password-protected'){
                $body_classes[] = 'password-protected';
            }

            if($url_segments[0] == 'coming-soon'){
                $body_classes[] = 'header-disabled';
            }

        } else {
            header("HTTP/1.1 404 Not Found");
            $body_classes[] = 'error404';
            $template = 'others/404.twig';
            $context['page']['title'] = 'Error 404';
            $context['page']['content'] = 'How did you get here?';
        }

    }

    // set body classes
    $context['body_classes'] = implode(' ', $body_classes);
    $context['html_title'] = $context['page']['title'] . ' / ' . SITE_NAME;

    $return = array();
    $return[0] = $template;
    $return[1] = $context;
    return $return;

}
