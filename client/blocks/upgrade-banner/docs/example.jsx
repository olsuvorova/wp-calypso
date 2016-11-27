/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import UpgradeBanner from 'blocks/upgrade-banner';

const UpgradeBanners = () =>
	<div>
		<UpgradeBanner
			button
			description="Live chat support and no advertising."
			title="Upgrade to a Personal Plan!"
		/>
		<UpgradeBanner
			title="Upgrade to a Personal Plan!"
		/>
		<UpgradeBanner
			description="Live chat support and no advertising."
			title="Upgrade to a Personal Plan!"
		/>
		<UpgradeBanner
			color="#855DA6"
			description="Live chat support and no advertising."
			icon="trophy"
			title="Upgrade to a Personal Plan!"
		/>
	</div>;

export default UpgradeBanners;