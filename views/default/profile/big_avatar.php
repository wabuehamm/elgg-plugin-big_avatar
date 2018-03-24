<?php

elgg_require_js('js/big_avatar');

$user = elgg_get_page_owner_entity();

$big_avatar = $user->getIconUrl([
    'size' => 'large'
]);

?>
<div id="bigAvatar">
    <img src="<?php echo $big_avatar;?>"/>
</div>
<div id="bigAvatarScreen"></div>