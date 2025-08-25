/**
 * @name ChatButtonsBegone
 * @displayName ChatButtonsBegone
 * @description Remove annoying stuff from your Discord clients.
 * @author LancersBucket
 * @authorId 355477882082033664
 * @version 2.14.3
 * @source https://github.com/LancersBucket/plugin-RemoveChatButtons
 * @updateUrl https://raw.githubusercontent.com/LancersBucket/plugin-RemoveChatButtons/refs/heads/main/ChatButtonsBegone.plugin.js
 */
/*@cc_on
@if (@_jscript)

var shell = WScript.CreateObject('WScript.Shell');
shell.Popup('It looks like you\'ve mistakenly tried to run me directly. That\'s not how you install plugins. \n(So don\'t do that!)', 0, 'I\'m a plugin for BetterDiscord', 0x30);

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

class EventHijacker {
    constructor() {
        this.mutationObserver = null;
        this.events = Array(1).fill([null, null]);

        this.settings = {
            singleAttachButton: false,
        }
    }

    setSetting(key, value) {
        if (key in this.settings) {
            this.settings[key] = value;
        }
        this.stopMutationObserver();
        this.startMutationObserver();
    }

    startMutationObserver() {
        // Disconnect previous observer if exists
        if (this.mutationObserver) this.mutationObserver.disconnect();

        // Only fire when a button is added to the DOM
        this.mutationObserver = new MutationObserver((mutationsList) => {
            let buttonAdded = false;
            for (const mutation of mutationsList) {
                for (const node of mutation.addedNodes) {
                    if (node.nodeType === 1) {
                        if (
                            (node.matches && node.matches("[class*='attachButton'][role=button]")) ||
                            (node.querySelector && node.querySelector("[class*='attachButton'][role=button]"))
                        ) {
                            buttonAdded = true;
                            break;
                        }
                    }
                }
                if (buttonAdded) break;
            }
            if (buttonAdded) {
                this.removeEvents();
                this.addEvents();
            }
        });
        this.mutationObserver.observe(document.body, { childList: true, subtree: true });

        // Initial run
        this.removeEvents();
        this.addEvents();
    }

    stopMutationObserver() {
        if (this.mutationObserver) this.mutationObserver.disconnect();
        this.mutationObserver = null;
        this.removeEvents();
    }

    async addEvents() {
        // Attach Button (Event 0)
        if (this.settings.singleAttachButton) {
            const attachButtonElement = document.querySelector("[class*='attachButton'][role=button]");
            const attachButtonHandler = (e) => {
                var target = e.target;
                if (target) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    
                    var handleClick = async () => {
                        // Redispach the click event to the original element
                        var doubleClickEvent = new MouseEvent('dblclick', {
                            bubbles: true,
                            cancelable: false,
                            view: window,
                        });
                        attachButtonElement.dispatchEvent(doubleClickEvent);
                    }
                    handleClick();
                }
            };
            this.events[0] = [attachButtonElement, attachButtonHandler];
            attachButtonElement.addEventListener('click', attachButtonHandler, { capture: true });
        }
    }

    removeEvents() {
        if (!this.events) return;
        for (const [el, handler] of this.events) {
            try {
                el.removeEventListener('click', handler, { capture: true });
            } catch {}
            try {
                el.removeEventListener('click', handler, { capture: false });
            } catch {}
        }
        this.events = [];
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
        version: '2.14.3',
        description: 'Remove annoying stuff from your Discord client.',
        github: 'https://github.com/LancersBucket/plugin-RemoveChatButtons',
        github_raw: 'https://raw.githubusercontent.com/LancersBucket/plugin-RemoveChatButtons/refs/heads/main/ChatButtonsBegone.plugin.js',
    },
    defaultConfig: [
        {
            type: 'switch',
            id: 'attachButton',
            name: 'Remove Attach Button',
            note: 'Removes the Attach button from the chatbar.',
            value: false,
        },
        {
            type: 'switch',
            id: 'giftButton',
            name: 'Remove Gift/Boost Button',
            note: 'Removes the Gift Nitro/Boost Server button from the chatbar.',
            value: true,
        },
        {
            type: 'switch',
            id: 'gifButton',
            name: 'Remove GIF Button',
            note: 'Removes the GIF button from the chatbar.',
            value: false,
        },
        {
            type: 'switch',
            id: 'stickerButton',
            name: 'Remove Sticker Button',
            note: 'Removes the Sticker button from the chatbar.',
            value: false,
        },
        {
            type: 'switch',
            id: 'emojiButton',
            name: 'Remove Emoji Button',
            note: 'Removes the Emoji button from the chatbar.',
            value: false,
        },
        {
            type: 'switch',
            id: 'appLauncherButton',
            name: 'Remove App Launcher Button',
            note: 'Removes the App Launcher button from the chatbar.',
            value: false,
        },
        {
            type: 'category',
            name: 'Message Actions',
            id: 'messageActions',
            collapsible: true,
            shown: false,
            settings: [ // Message Actions settings
                {
                    type: 'switch',
                    id: 'quickReactions',
                    name: 'Remove Quick Reactions',
                    note: 'Removes the quick reactions from the message actions.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'reactionButton',
                    name: 'Remove Reaction Button',
                    note: 'Removes the "Add Reaction" button from the message actions.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'superReactionButton',
                    name: 'Remove Super Reaction Button',
                    note: 'Removes the "Add Super Reaction" button from the message actions.',
                    value: true,
                },
                {
                    type: 'switch',
                    id: 'editButton',
                    name: 'Remove Edit Button',
                    note: 'Removes the "Edit" button from the message actions.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'replyButton',
                    name: 'Remove Reply Button',
                    note: 'Removes the "Reply" button from the message actions.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'forwardButton',
                    name: 'Remove Forward Button',
                    note: 'Removes the "Forward" button from the message actions.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'editImage',
                    name: 'Remove Edit Image Button',
                    note: 'Removes the "Edit Image with Apps" button when hovering over images.',
                    value: false,
                },
            ],
        },
        {
            type: 'category',
            name: 'Direct Messages',
            id: 'dms',
            collapsible: true,
            shown: false,
            settings: [ // DM settings
                {
                    type: 'switch',
                    id: 'quickSwitcher',
                    name: 'Remove Quick Switcher',
                    note: 'Removes the quick switcher ("Find or start a conversation") from the DM list.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'friendsTab',
                    name: 'Remove Friends Tab',
                    note: 'Removes the friends tab from the DM list.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'premiumTab',
                    name: 'Remove Nitro Tab',
                    note: 'Removes the Nitro tab from the DM list.',
                    value: true,
                },
                {
                    type: 'switch',
                    id: 'snowsgivingTab',
                    name: 'Remove Snowsgiving Tab',
                    note: 'Removes the seasonal "Snowsgiving" tab from the DM list.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'discordBirthdayTab',
                    name: 'Remove Discord\'s Birthday Tab',
                    note: 'Removes the seasonal "Discord\'s Birthday" tab from the DM list.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'discordShopTab',
                    name: 'Remove Discord\'s Shop Tab',
                    note: 'Removes the Discord Shop tab from the DM list.',
                    value: true,
                },
                {
                    type: 'dropdown',
                    id: 'DMHeader',
                    name: 'DM Header',
                    note: 'Controls the visibility of the DM header. "Show" shows the header, "Remove Button" removes the \'Create DM\' button, "Remove Text" removes the header text, "Remove" removes the entire header.',
                    value: 'show',
                    options: [
                        { label: "Show", value: 'show' },
                        { label: "Remove Button", value: 'hideButton' },
                        { label: "Remove Text", value: 'hideText' },
                        { label: "Remove", value: 'remove' },
                    ],
                },
                {
                    type: 'dropdown',
                    id: 'activeNow',
                    name: 'Active Now Section',
                    note: 'Controls the visibility of the "Active Now" section in the Friends tab. "Remove" removes the section, "Simplify" removes Twitch and Rich Presence blocks.',
                    value: 'show',
                    options: [
                        { label: "Show", value: 'show' },
                        { label: "Simplify", value: 'simplify' },
                        { label: "Remove", value: 'remove' },
                    ],
                },
            ],
        },
        {
            type: 'category',
            name: 'Servers',
            id: 'servers',
            collapsible: true,
            shown: false,
            settings: [ // Server settings
                {
                    type: 'switch',
                    id: 'serverBanner',
                    name: 'Remove Server Banner',
                    note: 'Removes the Server Banner Image/Container from the channel list.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'boostBar',
                    name: 'Remove Boost Bar',
                    note: 'Removes the boost progress bar from the channel list.',
                    value: true,
                },
                {
                    type: 'switch',
                    id: 'serverGuide',
                    name: 'Remove Server Guide',
                    note: 'Removes the Server Guide button from the channel list.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'eventButton',
                    name: 'Remove Event Button',
                    note: 'Removes the Event button from the channel list. Note: Does not remove any events that are "Happening Now."',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'membersButton',
                    name: 'Remove Members Button',
                    note: 'Removes the Members button from the channel list.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'channelsAndRoles',
                    name: 'Remove Channels & Roles Button',
                    note: 'Removes the Channels & Roles button from the channel list.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'browseChannels',
                    name: 'Remove Browse Channels Button',
                    note: 'Removes the Browse Channels button from the channel list.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'boostsButton',
                    name: 'Remove Server Boosts Button',
                    note: 'Removes the Server Boosts button from the channel list.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'inviteButton',
                    name: 'Remove Invite Button',
                    note: 'Removes the invite button when hovering over channel list entries.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'shopButton',
                    name: 'Remove Shop Button',
                    note: 'Removes the Server Shop button from the channel list.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'activitySection',
                    name: 'Remove Activities Section',
                    note: 'Removes the Activities Section from the server member list.',
                    value: false,
                },
            ],
        },
        {
            type: 'category',
            name: 'Voice',
            id: 'voice',
            collapsible: true,
            shown: false,
            settings: [ // Voice settings
                {
                    type: 'switch',
                    id: 'invitePlaceholder',
                    name: 'Remove Solo Invite Panel',
                    note: 'Removes the Invite/Activites Panel when only user in Voice.',
                    value: false,
                },
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
                    name: 'Remove Noise Suppression (Krisp) Button',
                    note: 'Removes the noise supression button from the user voice chat panel.',
                    value: false,
                },
            ],
        },
        {
            type: 'category',
            name: 'Title Bar',
            id: 'toolbar',
            collapsible: true,
            shown: false,
            settings: [ // Title Bar settings
                {
                    type: 'switch',
                    id: 'locator',
                    name: 'Remove Title Bar Text',
                    note: 'Removes the "locator" text in the title bar that shows the current server/DM.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'inboxButton',
                    name: 'Remove Inbox Button',
                    note: 'Removes the Inbox button.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'helpButton',
                    name: 'Remove Help Button',
                    note: 'Removes the Help button.',
                    value: false,
                },
            ],
        },
        {
            type: 'category',
            name: 'Profile Customizations',
            id: 'profileCustomizations',
            collapsible: true,
            shown: false,
            settings: [ // Profile Customizations settings
                {
                    type: 'switch',
                    id: 'namePlate',
                    name: 'Remove Nameplates',
                    note: 'Removes nameplates from members in the member list.',
                    value: false,
                },
                {
                    type: 'dropdown',
                    id: 'clanTag',
                    name: 'Clan Tag',
                    note: 'Controls the visibility of the Clan Tags. "Remove in Member List" removes it in member lists (Server/DM and messages), "Remove in Profile" removes it in profiles, "Remove" removes it everywhere.',
                    value: 'show',
                    options: [
                        { label: "Show", value: 'show' },
                        { label: "Remove in Member List", value: 'memberlist' },
                        { label: "Remove in Profile", value: 'profile' },
                        { label: "Remove", value: 'global' },
                    ],
                },
                {
                    type: 'dropdown',
                    id: 'avatarDecoration',
                    name: 'Avatar Decoration',
                    note: 'Controls the visibility of avatar decorations. "Remove in Member List" removes it in member lists (Server/DM and messages), "Remove in Profile" removes it in profiles, "Remove" removes it everywhere.',
                    value: 'show',
                    options: [
                        { label: "Show", value: 'show' },
                        { label: "Remove in Member List", value: 'memberlist' },
                        { label: "Remove in Profile", value: 'profile' },
                        { label: "Remove", value: 'global' },
                    ],
                },
                {
                    type: 'switch',
                    id: 'hideBadges',
                    name: 'Remove Profile Badges',
                    note: 'Removes the badges from user profiles.',
                    value: false,  
                },
            ],
        },
        {
            type: 'category',
            name: 'Miscellaneous',
            id: 'miscellaneous',
            collapsible: true,
            shown: false,
            settings: [ // Miscellaneous settings
                {
                    type: 'switch',
                    id: 'addServerButton',
                    name: 'Remove "Add a Server" Button',
                    note: 'Removes the "Add a Server" button from the server list.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'discoverButton',
                    name: 'Remove Discover Button',
                    note: 'Removes the "Discover" button from the server list.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'nitroUpsell',
                    name: 'Remove Nitro Advertising',
                    note: 'Removes Nitro advertising thoughout various parts of Discord. Note: May not remove all of them.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'noQuests',
                    name: 'Remove Quests',
                    note: 'Removes Quest related popups and interactions.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'placeholderText',
                    name: 'Remove Placeholder Text in message area',
                    note: 'Removes the placeholder text "Message ..." in the chat bar.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'avatarPopover',
                    name: 'Remove Avatar Reply/React Popover',
                    note: 'Removes the buttons when you hover over a user\'s profile picture.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'singleAttachButton',
                    name: 'Single Click File Select',
                    note: 'Changes the file select in the Attach Button to a single click instead of a double click. Note: This will remove the ability to create a poll.',
                    value: false,
                },
            ],
        },
        {
            type: 'category',
            name: 'Compatibility',
            id: 'compatibility',
            collapsible: true,
            shown: false,
            settings: [ // Compatibility settings
                {
                    type: 'switch',
                    id: 'invisibleTypingButton',
                    name: 'Remove Invisible Typing Button',
                    note: 'Removes the button added by Strencher\'s InvisibleTyping plugin from the chat.',
                    value: false,
                },
            ],
        },
        {
            type: 'category',
            name: 'Core Settings',
            id: 'core',
            collapsible: true,
            shown: false,
            settings: [ // Core settings
                {
                    type: 'switch',
                    id: 'checkForUpdates',
                    name: 'Check for Updates',
                    note: 'Check for updates on startup.',
                    value: true,
                },
                {
                    type: 'switch',
                    id: 'debug',
                    name: 'Enable Debugging',
                    note: 'Enables debug output, which provides more verbose information.',
                    value: false,
                },
            ],
        }
    ],
};

module.exports = class ChatButtonsBegone {
    constructor(meta) {
        this.meta = meta;
        this.api = new BdApi(this.meta.name);
        this.styler = new Styler(this.meta.name);
        this.eventHijacker = new EventHijacker(this.meta.name);
        this.settings = this.api.Data.load('settings') || this.defaultSettings();

        if (!this.api.Plugins.isEnabled(this.meta.name)) {
            if (this.settings.core.checkForUpdates) {
                this.checkForUpdates();
            }
        }

        // Get settingsVersion key, and create it if it doesn't exist.
        // This should only occur when updating from version before v2.10.0.
        this.settingVersion = this.api.Data.load('settingVersion');
        if (!this.settingVersion) {
            this.warn("Key settingVersion not found, creating...");
            this.settingVersion = "0.0.0";
            this.api.Data.save('settingVersion', this.settingVersion);
        }
        this.migrateConfigIfNeeded();

        // Ensure all keys exist in settings
        this.ensureDefaultSettings();
    }

    migrateConfigIfNeeded() {
        // List of migrations in order
        const migrations = [
            {
                from: "2.11.1",
                to: "2.12.0",
                migrate: (config) => {
                    // Combine activeNow and simplifyActiveNow into the dropdown activeNow
                    if (config.dms.activeNow == true) {
                        config.dms.activeNow = 'remove';
                    } else if (config.dms.simplifyActiveNow == true) {
                        config.dms.activeNow = 'simplify'
                    } else {
                        config.dms.activeNow = 'show';
                    }
                    delete config.dms.simplifyActiveNow;

                    // Migrate old clanTag setting to dropdown
                    if (config.miscellaneous.clanTag == true) {
                        config.miscellaneous.clanTag = 'memberlist';
                    } else {
                        config.miscellaneous.clanTag = 'show';
                    }

                    return config;
                }
            },
            {
                from: "2.12.5",
                to: "2.13.0",
                migrate: (config) => {
                    config.profileCustomizations = {};
                    if ('namePlate' in config.miscellaneous) {
                        config.profileCustomizations.namePlate = config.miscellaneous.namePlate;
                        delete config.miscellaneous.namePlate;
                    }
                    if ('clanTag' in config.miscellaneous) {
                        config.profileCustomizations.clanTag = config.miscellaneous.clanTag;
                        delete config.miscellaneous.clanTag;
                    }
                    if ('avatarDecoration' in config.miscellaneous) {
                        config.profileCustomizations.avatarDecoration = config.miscellaneous.avatarDecoration;
                        delete config.miscellaneous.avatarDecoration;
                    }
                    if ('hideBadges' in config.miscellaneous) {
                        config.profileCustomizations.hideBadges = config.miscellaneous.hideBadges;
                        delete config.miscellaneous.hideBadges;
                    }

                    return config;
                }
            }
        ];

        const compareVersions = (a,b) => {
            const aParts = a.split('.').map(Number);
            const bParts = b.split('.').map(Number);
            for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
                const aPart = aParts[i] || 0;
                const bPart = bParts[i] || 0;
                if (aPart > bPart) return 1;
                if (aPart < bPart) return -1;
            }
            return 0;
        }

        let currentVersion = this.settingVersion;
        for (const { from, to, migrate } of migrations) {
            if (compareVersions(currentVersion, to) < 0) {
                this.settings = migrate(this.settings);
                this.log(`Migrated config from v${from} to v${to}`);
                currentVersion = to;
            }
        }
        
        if (compareVersions(this.settingVersion, config.info.version) <= 0) {
            this.settingVersion = config.info.version;
            this.api.Data.save('settingVersion', this.settingVersion);
        }
        this.api.Data.save('settings', this.settings);
    }

    ensureDefaultSettings() {
        const defaultSettings = this.defaultSettings();
        for (const key in defaultSettings) {
            if (typeof defaultSettings[key] === 'object' && !Array.isArray(defaultSettings[key])) {
                this.settings[key] = { ...defaultSettings[key], ...this.settings[key] };
            } else if (!(key in this.settings)) {
                this.settings[key] = defaultSettings[key];
            }
        }
        this.api.Data.save('settings', this.settings);
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

    // Helper function for adding a CSS rule.
    addCssStyle(selector) {
        this.styler.add(this.getCssRule(selector));
    }

    addStyles() {
        /// Chat Buttons ///
        if (this.settings.attachButton) this.addCssStyle('[class^="attachWrapper"]');
        if (this.settings.giftButton) this.addCssStyle('[class^="channelTextArea"] [class^="buttons"] > [class^="button"]');
        if (this.settings.gifButton) this.addCssStyle('[class^="channelTextArea"] [class^="buttons"] > div[class^="expression"]:not(:has([class*="stickerButton"], [class*="emojiButton"]))');
        if (this.settings.stickerButton) this.addCssStyle('[class^="channelTextArea"] [class^="buttons"] > [class^="expression"]:has([class*="stickerButton"])');
        if (this.settings.emojiButton) this.addCssStyle('[class^="channelTextArea"] [class^="buttons"] > [class^="expression"]:has([class*="emojiButton"])');
        if (this.settings.appLauncherButton) this.addCssStyle('[class^=channelAppLauncher]');

        /// Message Actions ///
        if (this.settings.messageActions.quickReactions) this.styler.add(this.getAriaLabelRuleLoose(this.messageActionButtonsSelector, 'Click to react with '));
        if (this.settings.messageActions.superReactionButton) this.styler.add(this.getAriaLabelRule(this.messageActionButtonsSelector, 'Add Super Reaction'));
        if (this.settings.messageActions.reactionButton) this.styler.add(this.getAriaLabelRule(this.messageActionButtonsSelector, 'Add Reaction'));
        if (this.settings.messageActions.editButton) this.styler.add(this.getAriaLabelRule(this.messageActionButtonsSelector, 'Edit'));
        if (this.settings.messageActions.replyButton) this.styler.add(this.getAriaLabelRule(this.messageActionButtonsSelector, 'Reply'));
        if (this.settings.messageActions.forwardButton) this.styler.add(this.getAriaLabelRule(this.messageActionButtonsSelector, 'Forward'));
        if (this.settings.messageActions.editImage) this.addCssStyle('[aria-label="Edit Image with Apps"]');
        
        /// DMs ///
        if (this.settings.dms.quickSwitcher) this.addCssStyle(`${this.privateChannelsSelector} [class*="searchBar"]`);
        if (this.settings.dms.friendsTab) this.addCssStyle(`${this.privateChannelsSelector} [href="/channels/@me"]`);
        if (this.settings.dms.premiumTab) this.addCssStyle(`${this.privateChannelsSelector} [href="/store"]`);
        if (this.settings.dms.snowsgivingTab) this.addCssStyle(`${this.privateChannelsSelector} [href="//discord.com/snowsgiving"]`);
        if (this.settings.dms.discordBirthdayTab) this.addCssStyle(`${this.privateChannelsSelector} [href="/activities"]`);
        if (this.settings.dms.discordShopTab) {
            this.addCssStyle(`${this.privateChannelsSelector} [href="/shop"]`);
            this.addCssStyle('[class^="profileButtons"]>div:has(button:not([aria-expanded]))');
        }
        
        if (this.settings.dms.DMHeader == 'hideButton') {
            this.addCssStyle('h2 > [aria-label="Create DM"]');
        } else if (this.settings.dms.DMHeader == 'hideText') {
            this.addCssStyle('[class*="privateChannelsHeaderContainer"] > [class*="headerText"]');
        } else if (this.settings.dms.DMHeader == 'remove') {
            this.addCssStyle('[class*="privateChannelsHeaderContainer"]');
        }
        
        if (this.settings.dms.activeNow == 'simplify') {
            this.addCssStyle('div[class*="inset"]:has(div[class^="twitchSection"])');
            this.addCssStyle('div[class*="inset"]:has(div[class^="activitySection"])');
        } else if (this.settings.dms.activeNow == 'remove') {
            this.addCssStyle('[class^="nowPlayingColumn"]');
        }

        /// Servers ///
        if (this.settings.servers.boostBar) this.addCssStyle('div[id="channels"] > ul[class^="content"] div:has(div[class^="progress"])');
        if (this.settings.servers.serverGuide) this.addCssStyle('div[class^="containerDefault"]:has(div[id^="home-tab-"] + div[class^="link"])');
        if (this.settings.servers.eventButton) this.addCssStyle('div[class^="containerDefault"]:has(div[id^="upcoming-events-"] + div[class^="link"])');
        if (this.settings.servers.membersButton) this.addCssStyle('div[class^="containerDefault"]:has(div[id^="members-"])');
        if (this.settings.servers.channelsAndRoles) this.addCssStyle('div[class^="containerDefault"]:has(div[aria-label="Channels & Roles"])');
        if (this.settings.servers.browseChannels) this.addCssStyle('div[class^="containerDefault"]:has(div[aria-label="Browse Channels"] + div[class^="link"])');
        if (this.settings.servers.boostsButton) this.addCssStyle('div[class^="containerDefault"]:has(div[id^="skill-trees-"])');
        if (this.settings.servers.inviteButton) {
            this.addCssStyle('div[class*=iconItem][aria-label="Create Invite"]');
            this.addCssStyle('div[class*=iconItem][aria-label="Invite to Server"]');
        }
        if (this.settings.servers.shopButton) this.addCssStyle('div[class^="containerDefault"]:has(div[id^="shop-"] + div[class^="link"])');
        if (this.settings.servers.activitySection) this.addCssStyle('[class^="membersGroup"]:has([role="button"]), [class^="member"] [class^="container"]:has([class^="badges"])');
        if (this.settings.servers.serverBanner) {
            this.addCssStyle('nav[class^="container"] > div[class*="bannerVisible"] > div[class^="animatedContainer"]');
            this.addCssStyle('nav[class^="container"] > div[id="channels"] > ul > div[style="height: 84px;"]');
            this.addCssStyle('nav[class^="container"] > div[id="channels"] > ul > div[style="height: 8px;"]');
        }

        /// Voice ///
        if (this.settings.voice.invitePlaceholder) this.addCssStyle('div[class*="singleUserRoot"]');

        if (this.settings.voice.cameraPanelButton) {
            this.addCssStyle('div[class^="actionButtons"] button[aria-label="Turn On Camera"]');
            this.addCssStyle('div[class^="actionButtons"] button[aria-label="Turn Off Camera"]');
        }
        if (this.settings.voice.screensharePanelButton) this.addCssStyle('div[class^="actionButtons"] button[aria-label="Share Your Screen"]');
        if (this.settings.voice.activityPanelButton) this.addCssStyle('div[class^="actionButtons"] button[aria-label="Start An Activity"]');
        // Why in the nine hells is the soundboard button in it's own special div? Did Discord do this just to piss me in particular off?
        if (this.settings.voice.soundboardPanelButton) this.addCssStyle('div[class^="actionButtons"] div:has(> button[aria-label="Open Soundboard"])');
        if (this.settings.voice.krispButton) this.addCssStyle('button[aria-label="Noise Suppression powered by Krisp"]');

        /// Title Bar ///
        if (this.settings.toolbar.locator) this.addCssStyle('[class^="base"]>[class^="bar"]>[class^="title"]');
        if (this.settings.toolbar.helpButton) this.addCssStyle('a[href="https://support.discord.com"]');
        if (this.settings.toolbar.inboxButton) this.addCssStyle('div[class^="recentsIcon"]');
        
        /// Profile Customizations ///
        if (this.settings.profileCustomizations.namePlate) {
            // Server list
            this.addCssStyle('[class*=member] [class*=nameplated] [style*=linear-gradient]');
            // DM list
            this.addCssStyle('div[class*="interactive"]:hover>div[class*="container"]:has(img)');
            this.addCssStyle('div[class*="interactiveSelected"]>div[class*="container"]:has(img)');
        }

        if (this.settings.profileCustomizations.clanTag == 'memberlist') {
            this.addCssStyle('span[class*="clanTag"]');
        } else if (this.settings.profileCustomizations.clanTag == 'profile') {
            this.addCssStyle('span[class*="guildTagContainer"]');
        } else if (this.settings.profileCustomizations.clanTag == 'global') {
            this.addCssStyle('span[class*="clanTag"]');
            this.addCssStyle('span[class*="guildTagContainer"]');
        }

        if (this.settings.profileCustomizations.avatarDecoration == 'memberlist') {
            this.addCssStyle('div[class*="member"] div[class*="avatar"] [class*="avatarDecoration"]');
        } else if (this.settings.profileCustomizations.avatarDecoration == 'profile') {
            this.addCssStyle('div[class*="user-profile-popout"] div[class*="avatar"] [class*="avatarDecoration"]');
            this.addCssStyle('div[class*="profile"] div[class*="avatar"] [class*="avatarDecoration"]');
        } else if (this.settings.profileCustomizations.avatarDecoration == 'global') {
            this.addCssStyle('[class*="avatarDecoration"]');
        }

        if (this.settings.profileCustomizations.hideBadges) this.addCssStyle('div[aria-label="User Badges"]');

        /// Miscellaneous ///
        if (this.settings.miscellaneous.nitroUpsell) {
            this.addCssStyle('[class*="upsellContainer"], [class*="premiumFeature"]');
            this.addCssStyle('[id*="profile-customization-tab"] div[class*="container"]:has([class*="artContainer"])');
            // Upsell in Profiles > Per-Server Profiles (Only should remove if user does not have Nitro)
            this.addCssStyle('div[class*="upsellOverlayContainer"]:has(div > [class*="disabled"])');
            // DM List > Nitro - Offer badge
            this.addCssStyle('div[class*="premiumTrialBadge"]');
            // Billing Settings
            this.addCssStyle('[class*="premiumTab"], [data-tab-id="Nitro Server Boost"], [data-tab-id="Library Inventory"]');
            // Merch
            this.addCssStyle('[data-tab-id="merchandise"]');
        }
        if (this.settings.miscellaneous.addServerButton) this.addCssStyle('div[class*="itemsContainer"] > div[data-direction="vertical"] > div[class*="tutorialContainer"]:not(:first-child)');
        if (this.settings.miscellaneous.discoverButton) this.addCssStyle('div[class*="itemsContainer"] > div[data-direction="vertical"] > div[class*="listItem"]');
        if (this.settings.miscellaneous.placeholderText) this.addCssStyle('[class*="placeholder"][class*="slateTextArea"]');
        if (this.settings.miscellaneous.avatarPopover) this.addCssStyle('[class*="avatarPopover"]');
        if (this.settings.miscellaneous.noQuests) {
            // TODO: Currently only supports the Quests in the Active Now section.
            this.addCssStyle('div[class*="inset"]:has(div[class*="promotedTag"])');
        }
        
        /// Compatibility ///
        if (this.settings.compatibility.invisibleTypingButton) this.addCssStyle('div[class*="buttons"] div:has([class*="invisibleTypingButton"])');

        this.log(this.styler.styles.size, 'styles loaded.');

        /// Event Hijacker ///
        this.eventHijacker.setSetting('singleAttachButton', this.settings.miscellaneous.singleAttachButton);
    }

    refreshStyles() {
        this.styler.removeAll();
        this.addStyles();
        this.api.Data.save('settings', this.settings);
        this.api.UI.showToast('Styles refreshed.', { type: 'info' });
        this.log('Styles refreshed.');
    }

    async checkForUpdates() {
        try {
            // Check the latest version on remote
            const request = new XMLHttpRequest();
            request.open('GET', config.info.github_raw);
            request.onload = () => {
                if (request.status === 200) {
                    const remoteVersion = request.responseText.match(/version: ['"]([\d.]+)['"]/i)?.[1];
                    const localVersion = config.info.version;

                    const compareVersions = (a, b) => {
                        const aParts = a.split('.').map(Number);
                        const bParts = b.split('.').map(Number);
                        for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
                            const aPart = aParts[i] || 0;
                            const bPart = bParts[i] || 0;
                            if (aPart > bPart) return 1;
                            if (aPart < bPart) return -1;
                        }
                        return 0;
                    };
                    if (remoteVersion && compareVersions(remoteVersion, localVersion) > 0) {
                        this.log(`Update to v${remoteVersion} available.`);
                        BdApi.UI.showConfirmationModal('ChatButtonsBegone Update',
                            `A new version of ChatButtonsBegone (**v${remoteVersion}**) is available!\n\n` +
                            `You are on **v${localVersion}**. Please see the [changelog](${config.info.github}/blob/main/CHANGELOG.md) for a list of changes.\n\n` +
                            `Would you like to update now?`,
                            {
                                confirmText: 'Update',
                                onConfirm: () => {
                                    this.log("Updating plugin...");
                                    require('fs').writeFileSync(
                                        require('path').join(BdApi.Plugins.folder, `${config.info.name}.plugin.js`),
                                        request.responseText
                                    );
                                    this.log("Plugin updated! BetterDiscord will now reload the plugin.");
                                }
                            }
                        );
                    } else {
                        this.log("No updates available.");
                    }
                } else {
                    this.error(`Failed to check for updates. Status: ${request.status}`);
                }
            };
            request.send();
        } catch (e) {
            this.error('Failed to check for updates:', e);
        }
    }

    // This doesn't make the error handling work the way I wanted, but it does reduce the unessesary output.
    async start() {
        // Ensure all keys exist in settings
        this.ensureDefaultSettings();

        if (this.settings.core.checkForUpdates) {
            await this.checkForUpdates();
        }

        try {
            this.addStyles();
            this.eventHijacker.startMutationObserver();
        } catch (error) {
            this.error(`Failed to apply styles. Please report the following error to ${config.info.github}/issues:\n\n`, error);
            BdApi.UI.showToast('ChatButtonsBegone encountered an error! Check the console for more information.',
                {
                    type: 'error',
                    timeout: '5000',
                }
            );
        }
    }

    stop() {
        this.log("Stopping plugin...");
        this.styler.removeAll();
        this.eventHijacker.stopMutationObserver();
        this.log("All styles purged.");
    }

    getSettingsPanel() {
        const settings = JSON.parse(JSON.stringify(config.defaultConfig));
        settings.forEach(setting => {
            if (setting.type === 'category') {
                setting.settings.forEach(subSetting => {
                    // Try to set the value, if it's missing, initialize to default value.
                    try {
                        subSetting.value = this.settings[setting.id][subSetting.id];    
                    } catch (error) {
                        this.error(error);
                    }
                });
            } else {
                setting.value = this.settings[setting.id];
            }
        });

        return this.api.UI.buildSettingsPanel({
            settings,
            onChange: (category, id, value) => {
                if (category !== null) {
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

    get messageActionButtonsSelector() {
        const messageActionButtonsClass = this.api.findModuleByProps('buttons', 'cozyMessage')?.buttons;
        return this.toSelector(messageActionButtonsClass) + ' ';
    }

    get privateChannelsSelector() {
        const privateChannelsClass = this.api.findModuleByProps('privateChannels')?.privateChannels;
        return this.toSelector(privateChannelsClass);
    }

    toSelector(classString) {
        return classString ? '.' + classString.replace(/ /g, '.') : '';
    }

    log(...args) {
        try {
            if (this.settings.core.debug) {
                console.log(`%c[ChatButtonsBegone v${config.info.version}]`, 'color:lightblue;', ...args);
            }    
        } catch (e) {
            this.error("Debug key not found. Falling back to debug enabled.");
            console.log(`%c[ChatButtonsBegone v${config.info.version}]`, 'color:lightblue;', ...args);
        }
    }
    warn(...args) {
        try {
            if (this.settings.core.debug) {
                console.warn(`%c[ChatButtonsBegone v${config.info.version}]`, 'color:lightblue;', ...args);
            }
        } catch (e) {
            this.error("Debug key not found. Falling back to debug enabled.");
            console.warn(`%c[ChatButtonsBegone v${config.info.version}]`, 'color:lightblue;', ...args);
        }
    }
    error(...args) {
        console.error(`%c[ChatButtonsBegone v${config.info.version}]`, 'color:lightblue;', ...args);
    }
};
/*@end@*/
