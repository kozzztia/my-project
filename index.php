<?php

/** base constant */
const ABSPATH = __DIR__;

/** debug */
ini_set('log_errors', 1);
ini_set('display_errors', 0);
ini_set('error_log', ABSPATH . DIRECTORY_SEPARATOR . 'debug.log');
error_reporting(E_ALL);

/** composer */
require_once ABSPATH . DIRECTORY_SEPARATOR . 'vendor' . DIRECTORY_SEPARATOR . 'autoload.php';

/** let's go! */
require_once ABSPATH . DIRECTORY_SEPARATOR . 'core' . DIRECTORY_SEPARATOR . 'init.php';
