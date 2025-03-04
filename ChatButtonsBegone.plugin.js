/**
 * @name ChatButtonsBegone
 * @displayName ChatButtonsBegone
 * @description Remove annoying stuff from your Discord clients.
 * @author LancersBucket
 * @authorId 355477882082033664
 * @version 2.2.0
 * @source https://github.com/LancersBucket/plugin-RemoveChatButtons
 * @updateUrl https://raw.githubusercontent.com/LancersBucket/plugin-RemoveChatButtons/refs/heads/main/ChatButtonsBegone.plugin.js
 */
/*@cc_on
@if (@_jscript)

var shell = WScript.CreateObject("WScript.Shell");
shell.Popup("It looks like you've mistakenly tried to run me directly. That's not how you install plugins. \n(So don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);

@else@*/
class Styler {
    pluginName = '';
    styles = new Set();
    index = 0;

    constructor(pluginName) {
        this.pluginName = pluginName;
    }

    /**
     * Add a stylesheet to the document.
     * @param name The name of the stylesheet, can be used to remove it later.
     * @param style The css string to add as a stylesheet.
     * @returns A function that removes the stylesheet from the document.
     */
    add(name, style) {
        if (!style) {
            style = name;
            name = `${this.index++}`;
        }
        const key = `${this.pluginName}--Styler--${name}`;
        BdApi.injectCSS(key, style);
        this.styles.add(key);
        return () => {
            this.remove(name);
        };
    }

    /**
     * Remove a stylesheet with the given name from the document.
     * @param name The name of the stylesheet to remove.
     */
    remove(name) {
        const key = `${this.pluginName}--Styler--${name}`;
        BdApi.clearCSS(key);
        this.styles.delete(key);
    }

    /**
     * Remove all stylesheets that were added by this Styler instance from the document.
     */
    removeAll() {
        for (const key of this.styles) {
            BdApi.clearCSS(key);
        }
        this.styles.clear();
        this.index = 0;
    }
}

const config = {
    info: {
        name: 'ChatButtonsBegone',
        authors: [
            {
                name: 'Bucket',
                discord_id: '355477882082033664',
                github_username: 'LancersBucket'
            },
        ],
        version: '2.2.0',
        description: 'Hide annoying stuff from your Discord client.',
        github: 'https://github.com/BleedingBD/plugin-RemoveChatButtons',
        github_raw: 'https://raw.githubusercontent.com/BleedingBD/plugin-RemoveChatButtons/main/ChatButtonsBegone.plugin.js',
    },
    defaultConfig: [
        {
            type: 'switch',
            id: 'emojiButton',
            name: 'Remove Emoji Button',
            note: 'Removes the Emoji button from the chat.',
            value: false,
        },
        {
            type: 'switch',
            id: 'stickerButton',
            name: 'Remove Sticker Button',
            note: 'Removes the Sticker button from the chat.',
            value: true,
        },
        {
            type: 'switch',
            id: 'gifButton',
            name: 'Remove GIF Button',
            note: 'Removes the GIF button from the chat.',
            value: true,
        },
        {
            type: 'switch',
            id: 'giftButton',
            name: 'Remove Gift/Boost Button',
            note: 'Removes the Gift Nitro/Boost Server button from the chat.',
            value: true,
        },
        {
            type: 'switch',
            id: 'attachButton',
            name: 'Remove Attach Button',
            note: 'Removes the Attach button from the chat.',
            value: false,
        },
        {
            type: 'switch',
            id: 'appLauncherButton',
            name: 'Remove App Launcher Button',
            note: 'Removes the App Launcher button from the chat.',
            value: false,
        },
        {
            type: 'category',
            name: 'Message Actions',
            id: 'messageActions',
            collapsible: true,
            settings: [
                {
                    type: 'switch',
                    id: 'quickReactions',
                    name: 'Remove Quick Reactions',
                    note: 'Removes the quick reactions from messages.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'reactionButton',
                    name: 'Remove Reaction Button',
                    note: 'Removes the "Add Reaction" button from messages.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'superReactionButton',
                    name: 'Remove Super Reaction Button',
                    note: 'Removes the "Add Super Reaction" button from messages.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'editButton',
                    name: 'Remove Edit Button',
                    note: 'Removes the "Edit" button from messages.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'replyButton',
                    name: 'Remove Reply Button',
                    note: 'Removes the "Reply" button from messages.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'forwardButton',
                    name: 'Remove Forward Button',
                    note: 'Removes the "Forward" button from messages.',
                    value: false,
                },
            ],
        },
        {
            type: 'category',
            name: 'Direct Messages',
            id: 'dms',
            collapsible: true,
            settings: [
                {
                    type: 'switch',
                    id: 'friendsTab',
                    name: 'Remove Friends Tab',
                    note: 'Removes the friends tab button from the DM list.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'premiumTab',
                    name: 'Remove Nitro Tab',
                    note: 'Removes the nitro tab button from the DM list.',
                    value: true,
                },
                {
                    type: 'switch',
                    id: 'snowsgivingTab',
                    name: 'Remove Snowsgiving Tab',
                    note: 'Removes the seasonal "Snowsgiving" tab button from the DM list.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'discordBirthdayTab',
                    name: 'Remove Discord\'s Birthday Tab',
                    note: 'Removes the seasonal "Discord\'s Birthday" tab button from the DM list.',
                    value: true,
                },
                {
                    type: 'switch',
                    id: 'discordShopTab',
                    name: 'Remove Discord\'s Shop Tab',
                    note: 'Removes the Discord Shop tab button from the DM list.',
                    value: false,
                },
            ],
        },
        {
            type: 'category',
            name: 'Channel List',
            id: 'channels',
            collapsible: true,
            settings: [
                // Left disabled because I'm not sure what this did before.
                /*{
                    type: 'switch',
                    id: 'publicBadge',
                    name: 'Remove Public Badge',
                    note: 'Removes the "public" badge that covers part of server\'s banner.',
                    value: false,
                },*/
                {
                    type: 'switch',
                    id: 'boostBar',
                    name: 'Remove Boost Bar',
                    note: 'Removes the boost progress bar from the channel list.',
                    value: true,
                },
                {
                    type: 'switch',
                    id: 'inviteButton',
                    name: 'Remove Invite Button',
                    note: "Removes the invite button from the channel list entries. (It's also available in the context menu and the server settings anyway.)",
                    value: false,
                },
            ],
        },
        {
            type: 'category',
            name: 'Voice',
            id: 'voice',
            collapsible: true,
            settings: [
                {
                    type: 'switch',
                    id: 'cameraPanelButton',
                    name: 'Remove Camera Panel Button',
                    note: 'Removes the camera button from the voice chat panel in the bottom left.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'screensharePanelButton',
                    name: 'Remove Screenshare Panel Button',
                    note: 'Removes the screenshare button from the voice chat panel in the bottom left.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'activityPanelButton',
                    name: 'Remove Activity Panel Button',
                    note: 'Removes the activity button from the voice chat panel in the bottom left.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'soundboardPanelButton',
                    name: 'Remove Soundboard Panel Button',
                    note: 'Removes the soundboard button from the voice chat panel in the bottom left.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'krispButton',
                    name: 'Remove Noise Suppression Button',
                    note: 'Removes the noise supression button from the user voice chat panel.',
                    value: false,
                },
            ],
        },
        {
            type: 'category',
            name: 'Toolbar',
            id: 'toolbar',
            collapsible: true,
            settings: [
                {
                    type: 'switch',
                    id: 'inboxButton',
                    name: 'Remove Inbox Button',
                    note: "Removes the Inbox button.",
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'helpButton',
                    name: 'Remove Help Button',
                    note: "Removes the help button in the top right.",
                    value: false,
                },
            ],
        },
        {
            type: 'category',
            name: 'Compatibility',
            id: 'compatibility',
            collapsible: true,
            settings: [
                {
                    type: 'switch',
                    id: 'invisibleTypingButton',
                    name: 'Remove Invisible Typing Button',
                    note: "Removes the button added by Strencher's InvisibleTyping plugin from the chat.",
                    value: false,
                },
            ],
        },
    ],
    changelog: [
    ],
};

module.exports = class ChatButtonsBegone {
    constructor(meta) {
        this.meta = meta;
        this.api = new BdApi(this.meta.name);
        this.styler = new Styler(this.meta.name);
        this.settings = this.api.Data.load('settings') || this.defaultSettings();
        this.refreshLocaleFn = this.refreshLocaleFn.bind(this);
    }

    defaultSettings() {
        return config.defaultConfig.reduce((acc, cur) => {
            if (cur.type === 'category') {
                acc[cur.id] = cur.settings.reduce((a, c) => {
                    a[c.id] = c.value;
                    return a;
                }, {});
            } else {
                acc[cur.id] = cur.value;
            }
            return acc;
        }, {});
    }

    addStyles() {
        // Chat Buttons
        if (this.settings.emojiButton) this.styler.add(this.getAriaLabelRule(this.channelTextAreaSelector + ' ', "Select emoji"));
        if (this.settings.stickerButton) this.styler.add(this.getTextAreaCssRule(this.stickerButtonSelector));
        if (this.settings.gifButton) this.styler.add(this.getAriaLabelRule(this.channelTextAreaSelector + ' ', "Open GIF picker"));
        if (this.settings.giftButton) this.styler.add(this.getCssRule(`button${this.getAriaLabelSelector('Send a gift')}`));
        if (this.settings.attachButton) this.styler.add(this.getTextAreaCssRule(this.attachButtonSelector));
        if (this.settings.appLauncherButton) this.styler.add(this.getCssRule(this.appLauncherButton));

        // Message Actions
        if (this.settings.messageActions.quickReactions) this.styler.add(this.getAriaLabelRuleLoose(this.messageActionButtonsSelector + ' ', "Click to react with "));
        if (this.settings.messageActions.superReactionButton) this.styler.add(this.getAriaLabelRule(this.messageActionButtonsSelector + ' ', "Add Super Reaction"));
        if (this.settings.messageActions.reactionButton) this.styler.add(this.getAriaLabelRule(this.messageActionButtonsSelector + ' ', "Add Reaction"));
        if (this.settings.messageActions.editButton) this.styler.add(this.getAriaLabelRule(this.messageActionButtonsSelector + ' ', "Edit"));
        if (this.settings.messageActions.replyButton) this.styler.add(this.getAriaLabelRule(this.messageActionButtonsSelector + ' ', "Reply"));
        if (this.settings.messageActions.forwardButton) this.styler.add(this.getAriaLabelRule(this.messageActionButtonsSelector + ' ', "Forward"));

        // DMs
        if (this.settings.dms.friendsTab) this.styler.add(this.getCssRule(`${this.privateChannelsSelector} [href="/channels/@me"]`));
        if (this.settings.dms.premiumTab) this.styler.add(this.getCssRule(`${this.privateChannelsSelector} [href="/store"]`));
        if (this.settings.dms.snowsgivingTab) this.styler.add(this.getCssRule(`${this.privateChannelsSelector} [href="//discord.com/snowsgiving"]`));
        if (this.settings.dms.discordBirthdayTab) this.styler.add(this.getCssRule(`${this.privateChannelsSelector} [href="/activities"]`));
        if (this.settings.dms.discordShopTab) this.styler.add(this.getCssRule(`${this.privateChannelsSelector} [href="/shop"]`));

        // Channels
        // I really don't know what this is referencing.
        // if (this.settings.channels.publicBadge) {
        //     const { DISCOVERABLE_GUILD_HEADER_PUBLIC_INFO } = Messages;
        //     this.styler.add(this.getAriaLabelRule(this.communityInfoPillSelector, DISCOVERABLE_GUILD_HEADER_PUBLIC_INFO));
        // }
        if (this.settings.channels.boostBar) {
            this.styler.add(this.getDataListItemIdRuleLoose('', 'channels___boosts'));
        }
        if (this.settings.channels.inviteButton) {
            this.styler.add(this.getAriaLabelRule(this.iconItemSelector, "Create Invite"));
        }

        // Voice
        const actionButtons = this.voiceActionButtonsSelector + ' ';

        if (this.settings.voice.cameraPanelButton) this.styler.add(this.getAriaLabelRule(actionButtons, "Turn On Camera", "Turn Off Camera"));
        if (this.settings.voice.screensharePanelButton) this.styler.add(this.getAriaLabelRule(actionButtons, "Share Your Screen"));
        if (this.settings.voice.activityPanelButton) this.styler.add(this.getAriaLabelRule(actionButtons, "Start An Activity"));
        if (this.settings.voice.soundboardPanelButton) this.styler.add(this.getAriaLabelRule(actionButtons, "Open Soundboard"));
        if (this.settings.voice.krispButton) this.styler.add(this.getCssRule(`button${this.getAriaLabelSelector('Noise Suppression powered by Krisp')}`));

        // Toolbar
        if (this.settings.toolbar.helpButton) this.styler.add(this.getCssRule(`a[href="https://support.discord.com"]`));
        if (this.settings.toolbar.inboxButton) this.styler.add(this.getCssRule(this.inboxButtonSelector));

        // Compatibility
        if (this.settings.compatibility.invisibleTypingButton) this.styler.add(this.getTextAreaCssRule('.invisibleTypingButton'));
    }

    refreshStyles() {
        this.styler.removeAll();
        this.addStyles();
        this.api.Data.save('settings', this.settings);
        this.api.UI.showToast('Styles refreshed.', { type: 'info' });
    }

    refreshLocaleFn() {
        setTimeout(this.refreshStyles(), 1000);
    }

    start() {
        this.addStyles();
        if (this.LocaleManager) this.LocaleManager.on('locale', this.refreshLocaleFn);
    }

    stop() {
        this.styler.removeAll();
        if (this.LocaleManager) this.LocaleManager.off('locale', this.refreshLocaleFn);
    }

    getSettingsPanel() {
        const settings = JSON.parse(JSON.stringify(config.defaultConfig));
        settings.forEach(setting => {
            if (setting.type === 'category') {
                setting.settings.forEach(subSetting => {
                    // Try to set the value, if it's missing, initialize to default value.
                    try {
                        subSetting.value = this.settings[setting.id][subSetting.id];    
                    } catch (error) {}
                });
            } else {
                setting.value = this.settings[setting.id];
            }
        });

        return this.api.UI.buildSettingsPanel({
            settings,
            onChange: (category, id, value) => {
                if (category === 'messageActions' || category === 'dms' || category === 'channels' || category === 'voice' || category === 'toolbar' || category === 'compatibility') {
                    // Try to modify the key, if the category is missing, create it.
                    try {
                        this.settings[category][id] = value;
                    } catch (error) {
                        this.settings[category] = {};
                        this.settings[category][id] = value;
                    }
                } else {
                    this.settings[id] = value;
                }
                this.api.Data.save('settings', this.settings);
                this.refreshStyles();
            },
        });
    }

    getCssRule(selector) {
        return `${selector} { display: none !important; }`;
    }

    getTextAreaCssRule(child) {
        return this.getCssRule(`${this.channelTextAreaSelector} ${child}`);
    }

    getAriaLabelSelector(label) {
        return `[aria-label="${label}"]`;
    }

    getAriaLabelRule(pre, ...labels) {
        return this.getCssRule(labels.map((label) => `${pre || ''}${this.getAriaLabelSelector(label)}`).join(', '));
    }

    getAriaLabelSelectorLoose(label) {
        return `[aria-label*="${label}"]`;
    }

    getAriaLabelRuleLoose(pre, ...labels) {
        return this.getCssRule(labels.map((label) => `${pre || ''}${this.getAriaLabelSelectorLoose(label)}`).join(', '));
    }

    getDataListItemIdLoose(label) {
        return `[data-list-item-id*="${label}"]`;
    }

    getDataListItemIdRuleLoose(pre, ...labels) {
        return this.getCssRule(labels.map((label) => `${pre || ''}${this.getDataListItemIdLoose(label)}`).join(', '));
    }

    get channelTextAreaSelector() {
        const buttonClasses = this.api.findModuleByProps('emojiButton', 'stickerButton');
        return this.toSelector(buttonClasses.channelTextArea);
    }

    get emojiButtonSelector() {
        const buttonClasses = this.api.findModuleByProps('emojiButton', 'stickerButton');
        return this.toSelector(buttonClasses.emojiButton);
    }

    get stickerButtonSelector() {
        const buttonClasses = this.api.findModuleByProps('emojiButton', 'stickerButton');
        return this.toSelector(buttonClasses.stickerButton);
    }

    get attachButtonSelector() {
        const buttonClasses = this.api.findModuleByProps('emojiButton', 'stickerButton');
        return this.toSelector(buttonClasses.attachButton);
    }

    get appLauncherButton() {
        const appLauncherClass = this.api.findModuleByProps('channelAppLauncher');
        return this.toSelector(appLauncherClass.channelAppLauncher);
    }

    get messageActionButtonsSelector() {
        const messageActionButtonsClass = this.api.findModuleByProps('buttons', 'cozyMessage')?.buttons;
        return this.toSelector(messageActionButtonsClass);
    }

    get privateChannelsSelector() {
        const privateChannelsClass = this.api.findModuleByProps('privateChannels')?.privateChannels;
        return this.toSelector(privateChannelsClass);
    }

    get communityInfoPillSelector() {
        const communityInfoPillClass = this.api.findModuleByProps('communityInfoPill')?.communityInfoPill;
        return this.toSelector(communityInfoPillClass);
    }

    get iconItemSelector() {
        const iconItemClass = this.api.findModuleByProps('iconBase', 'iconItem')?.iconItem;
        return this.toSelector(iconItemClass);
    }

    get voiceActionButtonsSelector() {
        const voiceActionButtonsClass = this.api.findModuleByProps('actionButtons', 'voiceUsers')?.actionButtons;
        return this.toSelector(voiceActionButtonsClass);
    }

    get inboxButtonSelector() {
        const inboxButtonClass = this.api.findModuleByProps('recentsIcon')?.recentsIcon;
        return this.toSelector(inboxButtonClass);
    }

    toSelector(classString) {
        return classString ? '.' + classString.replace(/ /g, '.') : '';
    }
};
/*@end@*/