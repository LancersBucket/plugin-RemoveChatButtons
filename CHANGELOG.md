# Changelog
## v2.13.1
### Fixed
- Migrator issues

## v2.13.0
### Added
- Event hijacker system to support modifications beyond CSS changes
- Option to change the attach button back to a single click for the file select popup [Miscellaneous]
- Profile Customizations cateogry

### Changed
- Moved Nameplates, Clan Tag, Avatar Decorations, and Profile Badges into the new Profile Customizations category

## v2.12.5
### Fixed
- Title Bar removing unrelated text

## v2.12.4
### Fixed
- Updating from versions < v2.11.0 will now load properly
- Title Bar not hiding 

## v2.12.3
### Fixed
- Attach button not being removed (thanks [@Zacam](https://github.com/Zacam)!)
- Removed temporary fix for BetterDiscord styling

## v2.12.2
### Added
- Option to remove Profile Badges [Miscellaneous]

### Fixed
- Boost Bar should be properly removed again (thanks [@Zacam](https://github.com/Zacam)!)
- Errors now properly output in the console even if Enable Debugging is disabled.

## v2.12.1
### Fixed
- Config migrator now correctly migrates configs from < v2.10.0
- Voice options work again

## v2.12.0
### Added
- Converted some settings into dropdowns, expanding their capabilities
    - Merged "Remove Active Now" and "Simplify Active Now" into "Active Now" [Direct Messages]
        - Show: Keeps Active Now
        - Simplify: Simplifies Active Now
        - Remove: Removes Active Now
    - Enhanced "Remove Clan Tag" into "Clan Tag" [Miscellaneous]
        - Show: Keeps Clan Tags
        - Member List: Removes Clan Tags in Server/DM members lists and messages
        - Profile: Removes Clan Tags in profiles
        - Global: Removes Clan Tags entirely
- Option to modify Avatar Decorations [Miscellaneous]
    - Show: Keeps Avatar Decorations
    - Member List: Removes Avatar Decorations in Server/DM members lists and messages
    - Profile: Removes Avatar Decorations in profiles
    - Global: Removes Avatar Decorations entirely

### Changed
- Remove Discord Shop Tab [Direct Messages] now also removes shop button in profile view. (thanks [@Zacam](https://github.com/Zacam)!)

### Fixed
- Issue with config migration where it could overwrite certain config settings

## v2.11.1
### Fixed
- Update checker should work again
    - **NOTE: USERS WITH v2.11.0 WILL NEED TO MANUALLY UPDATE TO v2.11.1+**
- Boost Bar should be properly removed again (thanks [@Zacam](https://github.com/Zacam)!)

## v2.11.0
### Added
- Option to enable better console debugging [Core Settings]
    - Enhanced logging and debugging throughout the plugin
- Plugin now checks for updates before fully running, allowing the user to update even if the plugin is broken

### Changed
- Renamed Update Settings to Core Settings

### Fixed
- (Better)Discord should now load faster when opening the app with ChatButtonsBegone enabled
- Plugin load issue (thanks [@Zacam](https://github.com/Zacam)!)

## v2.10.1
### Added
- Remove Nitro Advertisting [Miscellaneous] now removes Nitro advertising from the per-server profile page

### Changed
- Cleaned up legacy code to ensure future Discord and BD version compatability (thanks [@Zacam](https://github.com/Zacam)!)

## v2.10.0
### Added
- Config migration system to allow for relocation of settings while preserving its state.
- Option to Simplify the Active Now Section [Direct Messages]
    - Hides all Active Now insets for Twitch (thanks [@Zacam](https://github.com/Zacam)!) and Rich Presence
- Option to remove Discord Quest related things [Miscellaneous] (thanks [@Zacam](https://github.com/Zacam)!)

## v2.9.0
### Added
- Option to remove Server Guide [Servers]
- Option to remove Event Button [Servers]
- Option to remove Channels & Roles Button [Servers]
- Option to remove Browse Channels Button [Servers]
- Option to remove Server Boosts Button [Servers]
- Option to remove Clan Tags [Miscellaneous]

### Changed
- Moved Nameplates toggle Miscellaneous, as it applies to the member list in both Servers and DMs now
    - You will need to re-enable the setting if you had it enabled before

## v2.8.2
### Fixed
- Main chat bar toggles not saving toggle state on change
- GIF, Emoji, Sticker, and App Launcher buttons not hiding

## v2.8.1
### Fixed
- Nameplate toggle not removing nameplates (thanks [@Zacam](https://github.com/Zacam)!) 
    - Made the CSS injection a looser rule to hopefully make it more resistant against client side changes

## v2.8.0
### Added
- Option to remove the Title Bar "Locator" Text [Title Bar]

### Fixed
- Nameplate toggle not removing nameplates

### Changed
- Moved Placeholder Text to Miscellaneous instead of Message Actions
    - You will need to re-enable the setting if you had it enabled before
- Reworded and rewrote setting name and descriptions
- Renamed Toolbar category to Title Bar
- Reordered the chat bar options to match how they appear in Discord

## v2.7.0
### Added
- After this version, if there is a new version of the plugin, it will now prompt for an update (thanks [@MisansProducts](https://github.com/MisansProducts)!)
    - This functionality can be disabled with the Check For Updates toggle [Update Settings]

## v2.6.0
### Added
- Option to remove placeholder "Message ..." in message bar [Message Actions] (thanks [@Zacam](https://github.com/Zacam)!) 
- Option to remove "Add a Server" and "Discovery" button [Miscellaneous] (thanks [@Zacam](https://github.com/Zacam)!) 

### Changed
- Moved some settings from "Channel List" and "Miscellaneous" into new "Server List" category
    - You will need to re-enable any settings that were moved
        - Boost Bar
        - Invite Button
        - Acitivities Section
        - Nameplates
- Settings categories are now collapsed by default
    - This should help with finding the settings you need

## v2.5.2
### Added
- Remove Nameplates toggle now remove nameplates in the DM list (thanks [@Zacam](https://github.com/Zacam)!) 
### Fixed
- Fixed Nameplates toggle removing member name too (thanks [@Zacam](https://github.com/Zacam)!)

## v2.5.1
### Fixed
- Erroneous github and github_raw links.

## v2.5.0
### Added
- Option to remove the "Edit Image with Apps" button when hovering over images [Message Actions]
- Option to remove Nitro advertisements not covered by other settings [Miscellaneous]
    - Currently only covers the profile editing menu

## v2.4.0
### Added
- Option to remove the Quick Switcher in the DM list (Find or start a conversation search box) [Direct Messages]
- Option to remove the Active Now section in the DM list [Direct Messages]
- Option to remove the Avatar Popover buttons (Buttons that appear when hovering over a user's profile picture) [Miscellaneous]
- Option to remove Nameplates from members in the server member list [Miscellaneous]

## v2.3.0
### Added
- New option to disable the activities section in server member lists

### Changed
- Options related to Nitro are now all enabled by default
- Options not realted to Nitro are not all disabled by default

### Fixed
- Future additions are now propery added to the config file

## v2.2.0
### Added
- Made setting categories collapsable
- Re-added Channel category options

### Fixed
- Compatability with Invisible Typing Indicators (thanks [@Zacam](https://github.com/Zacam)!)

## v2.1.0
### Changed
- Renamed plugin to ChatButtonsBegone to prepare for BetterDiscord upload and ensure no conflicts with RemoveChatButtons

## v2.0.3
### Fixed
- Typo causing Quick Reactions to not be disabled when toggled

## v2.0.2
### Fixed
- Quick Reaction icons hidden when toggle is disabled
### Removed
- Removed all Channel section toggles (these will be added back in a future update)

## v2.0.1
### Added
- Seperated Quick Reactions and Add Reaction as two different toggles
### Fixed
- Quick Reactions not being removed when toggled
### Removed
- Temporarily removed Boost Bar toggle (this will be added back in a future update)

## v2.0.0
- Rewrote the plugin to remove the dependency on ZeresPluginLibrary