<?php

elgg_import_esm('js/big_avatar');

$user = elgg_get_page_owner_entity();

$big_avatar = $user->getIconUrl([
    'size' => 'master'
]);

?>
<div id="bigAvatar">
    <img src="<?php echo $big_avatar;?>"/>
</div>
<div id="bigAvatarScreen"></div>