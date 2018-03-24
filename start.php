<?php

/**
 * Initialize plugin
 */
function plugin_init()
{
    elgg_extend_view('profile/details', 'profile/big_avatar');
    elgg_extend_view('elgg.css', 'css/big_avatar.css');

}

elgg_register_event_handler('init', 'system', 'plugin_init');
