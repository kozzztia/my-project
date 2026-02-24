<?php

if(!defined('ABSPATH')){exit;}

function get_allowed_templates($with_404 = false) {
    $templates = glob(ABSPATH . DS . TWIG_VIEWS_DIRNAME . DS . '*.twig');
    // keep only filenames
    $templates = array_map(function($file) {
        return basename($file, '.twig');
    }, $templates);
    // exclude home.twig and 404.twig and base.twig
    $templates = array_filter($templates, function($template) {
        return !in_array($template, ['index']);
    });
    if(!empty($with_404)) {
        $templates[] = '404';
    }
    return $templates;
}

function get_all_blocks_styles(){
    $blocks_groups = glob(ABSPATH . DS . 'assets' . DS . 'css' . DS . 'blocks' . DS . '*');
    $return = "";
    if(!empty($blocks_groups)){
        foreach($blocks_groups as $group){
            $group_name = basename($group);
            $group_styles = glob(ABSPATH . DS . 'assets' . DS . 'css' . DS . 'blocks' . DS . $group_name . DS . '*.css');
            if(!empty($group_styles)){
                foreach ($group_styles as $style) {
                    $style_name = basename($style, '.min.css');
                    $return .= '<link rel="stylesheet" id="'.$group_name.'-'.$style_name.'-css" href="'.HOME_URL.'assets/css/blocks/'.$group_name.'/'.$style_name.'.min.css?ver='.ASSETS_VERSION.'" type="text/css" media="all" />';
                    $return .= "\n";
                }
            }
        }
    }
    return $return;
}

function minify_html($html) {
    if (MINIFY_HTML) {
        return preg_replace([
            '/\>[^\S ]+/s',
            '/[^\S ]+\</s',
            '/(\s)+/s'
        ], [
            '>',
            '<',
            '\\1'
        ], $html);
    } else {
        return preg_replace("/^\s*\n/m", '', $html);
    }
}

function get_svg_sprite_icons() {
    $sprite_path = ABSPATH . DS . 'assets' . DS . 'svg' . DS . 'sprite.svg';

    if (!file_exists($sprite_path)) {
        return [];
    }

    $sprite_content = file_get_contents($sprite_path);

    // Знаходимо всі id у SVG файлі
    preg_match_all('/id="([^"]+)"/', $sprite_content, $matches);

    if (empty($matches[1])) {
        return [];
    }

    // Повертаємо унікальні значення
    return array_unique($matches[1]);
}

function get_context() {

    $context = array();

    // for index page (list of templates)
    $context['allowed_templates'] = get_allowed_templates(true);

    // get all blocks all styles
    $context['all_blocks_styles'] = get_all_blocks_styles();

    // for rest of the pages
    $context['site']['charset'] = SITE_CHARSET;
    $context['site']['url'] = HOME_URL;
    $context['site']['name'] = SITE_NAME;
    $context['site']['html_loc'] = HTML_LOC;
    $context['site']['assets'] = ASSETS_URL;
    $context['assets_version'] = ASSETS_VERSION;
    $context['request']['get'] = $_GET;
    $context['request']['post'] = $_POST;
    $context['request']['cookie'] = $_COOKIE;
    $context['request']['server'] = $_SERVER;
    $context['svg_sprite'] = SVG_SPRITE_URL;
    $context['svg_folder'] = SVG_FOLDER;
    $context['img_folder'] = IMG_FOLDER;
    $context['year'] = date('Y');
    $context['sprite_icons'] = get_svg_sprite_icons();

    return $context;

}

function get_twig() {

    // create twig loader
    $loader = new \Twig\Loader\FilesystemLoader(TWIG_VIEWS_DIRNAME);

    // twig render options
    $twig_options = array();

    // create twig object
    $twig = new \Twig\Environment($loader, $twig_options);

    // adding twig global functions
     $twig->addFunction(new \Twig\TwigFunction('ucfirst', 'ucfirst'));
     $twig->addFunction(new \Twig\TwigFunction('rand_id', function(){
         return bin2hex(random_bytes(8));
     }));

    // adding twig filters
    $twig->addFilter( new \Twig\TwigFilter( 'pr', 'pr' ) );
    $twig->addFilter( new \Twig\TwigFilter( 'log', 'write_log' ) );

    return $twig;

}

function get_template($template, $context = []) {
    $twig = get_twig();
    $output = $twig->render($template, $context);
    return minify_html(htmlspecialchars_decode($output));
}
