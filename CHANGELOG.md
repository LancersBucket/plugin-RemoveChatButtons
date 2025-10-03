# Changelog
## v2.15.4 - October 10th, 2025
### Fixed
- Gift button not removing properly

## v2.15.3 - September 27th, 2025
### Added
- Option to remove Status Change Nudge [Miscellaneous] (thanks [@Zacam](https://github.com/Zacam)!)
### Fixed
- Chatbar options resetting to false each update

## v2.15.2 - September 24th, 2025
### Added
- New dropdown option in Active Now to remove the section when it is empty [Direct Messages]
    - Also added dropdown option to remove the section when empty, simplify otherwise 

## v2.15.1 - September 10th, 2025
### Added
- Option to remove the naviagation (forward/back) buttons [Title Bar]
### Fixed
- Some message action buttons not removing properly 

## v2.15.0 - September 9th, 2025
### Changed
- Moved Chat Bar options (Attach Button, Gift Button, etc.) into their own category [Chat Bar]
- Nitro Upsell now removes Nitro advertisement in the Appearance settings [Miscellaneous]
- Updated codebase to remove dependence on depreciated BD functions
- Switched to BD's native logging class and reduced unneeded console output

### Removed
- Option to enable debugging

## v2.14.4 - September 1st, 2025
### Added
- Option to remove seperator bar from DM/Server channel list [Miscellaneous]

### Changed
- Rearranged Server settings to be more consistant with how they appear in the client

## v2.14.3 - August 25th, 2025
### Changed
- Nitro Upsell now removes more content across Discord [Miscellaneous] (thanks [@Zacam](https://github.com/Zacam)!)
- Tweaked dropdown menu options to be more explicit in what they remove
- Changed language to consistently use "remove" instead of "hide"

## v2.14.2 - August 22nd, 2025
### Fixed
- Chatbar buttons not removing properly

## v2.14.1 - August 20th, 2025
Special thanks to [@Zacam](https://github.com/Zacam) for their work on this update.
### Added
- Option to remove Members button from channel list [Servers]

### Changed
- Rearranged Server settings to be more consistant with how they appear in the client

### Fixed
- Main chat buttons not removing properly
- Server Boosts button not removing properly
- Channels & Roles button not removing properly
- Solo VC Invite not removing properly

## v2.14.0 - August 16th, 2025
Special thanks to [@Zacam](https://github.com/Zacam) for their work on this update.
### Added
- Option to remove the server channel list shop button [Servers]
- Option to remove the server banner [Servers]
- Option to remove the panel that appears for Invite/Start Activity when user is the only one in a voice chat [Voice]

### Fixed
- Per channel server invite button not removing in all cases

## v2.13.2 - August 13th, 2025
### Added
- Option to customize the DM list header [Direct Messages]
    - Show: Keeps it
    - Hide Button: Hides the "Create DM" button
    - Hide Text: Hides the "Direct Message" text
    - Remove: Removes both the text and button

### Fixed
- Plugin now checks for updates even if there is a constructor error, reducing the need to manually update.

## v2.13.1 - August 10th, 2025
### Fixed
- Migrator issues

## v2.13.0 - August 10th, 2025
### Added
- Event hijacker system to support modifications beyond CSS changes
- Option to change the attach button back to a single click for the file select popup [Miscellaneous]
- Profile Customizations cateogry

### Changed
- Moved Nameplates, Clan Tag, Avatar Decorations, and Profile Badges into the new Profile Customizations category

## v2.12.5 - August 3rd, 2025
### Fixed
- Title Bar removing unrelated text

## v2.12.4 - July 29th, 2025
### Fixed
- Updating from versions < v2.11.0 will now load properly
- Title Bar not removing 

## v2.12.3 - July 28th, 2025
### Fixed
- Attach button not being removed (thanks [@Zacam](https://github.com/Zacam)!)
- Removed temporary fix for BetterDiscord styling

## v2.12.2 - July 22nd, 2025
### Added
- Option to remove Profile Badges [Miscellaneous]

### Fixed
- Boost Bar should be properly removed again (thanks [@Zacam](https://github.com/Zacam)!)
- Errors now properly output in the console even if Enable Debugging is disabled.

## v2.12.1 - July 19nd, 2025
### Fixed
- Config migrator now correctly migrates configs from < v2.10.0
- Voice options work again

## v2.12.0 - July 18th, 2025
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

## v2.11.1 - July 10th, 2025
### Fixed
- Update checker should work again
    - **NOTE: USERS WITH v2.11.0 WILL NEED TO MANUALLY UPDATE TO v2.11.1+**
- Boost Bar should be properly removed again (thanks [@Zacam](https://github.com/Zacam)!)

## v2.11.0 - July 9th, 2025
### Added
- Option to enable better console debugging [Core Settings]
    - Enhanced logging and debugging throughout the plugin
- Plugin now checks for updates before fully running, allowing the user to update even if the plugin is broken

### Changed
- Renamed Update Settings to Core Settings

### Fixed
- (Better)Discord should now load faster when opening the app with ChatButtonsBegone enabled
- Plugin load issue (thanks [@Zacam](https://github.com/Zacam)!)

## v2.10.1 - July 8th, 2025
### Added
- Remove Nitro Advertisting [Miscellaneous] now removes Nitro advertising from the per-server profile page

### Changed
- Cleaned up legacy code to ensure future Discord and BD version compatability (thanks [@Zacam](https://github.com/Zacam)!)

## v2.10.0 - June 18th, 2025
### Added
- Config migration system to allow for relocation of settings while preserving its state.
- Option to Simplify the Active Now Section [Direct Messages]
    - Removes all Active Now insets for Twitch (thanks [@Zacam](https://github.com/Zacam)!) and Rich Presence
- Option to remove Discord Quest related things [Miscellaneous] (thanks [@Zacam](https://github.com/Zacam)!)

## v2.9.0 - June 3rd, 2025
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

## v2.8.2 - May 15th, 2025
### Fixed
- Main chat bar toggles not saving toggle state on change
- GIF, Emoji, Sticker, and App Launcher buttons not removing

## v2.8.1 - May 9th, 2025
### Fixed
- Nameplate toggle not removing nameplates (thanks [@Zacam](https://github.com/Zacam)!) 
    - Made the CSS injection a looser rule to hopefully make it more resistant against client side changes

## v2.8.0 - May 7th, 2025
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

## v2.7.0 - May 2nd, 2025
### Added
- After this version, if there is a new version of the plugin, it will now prompt for an update (thanks [@MisansProducts](https://github.com/MisansProducts)!)
    - This functionality can be disabled with the Check For Updates toggle [Update Settings]

## v2.6.0 - May 1st, 2025
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

## v2.5.2 - April 28th, 2025
### Added
- Remove Nameplates toggle now remove nameplates in the DM list (thanks [@Zacam](https://github.com/Zacam)!) 
### Fixed
- Fixed Nameplates toggle removing member name too (thanks [@Zacam](https://github.com/Zacam)!)

## v2.5.1 - April 25th, 2025
### Fixed
- Erroneous github and github_raw links.

## v2.5.0 - April 23rd, 2025
### Added
- Option to remove the "Edit Image with Apps" button when hovering over images [Message Actions]
- Option to remove Nitro advertisements not covered by other settings [Miscellaneous]
    - Currently only covers the profile editing menu

## v2.4.0 - April 20th, 2025
### Added
- Option to remove the Quick Switcher in the DM list (Find or start a conversation search box) [Direct Messages]
- Option to remove the Active Now section in the DM list [Direct Messages]
- Option to remove the Avatar Popover buttons (Buttons that appear when hovering over a user's profile picture) [Miscellaneous]
- Option to remove Nameplates from members in the server member list [Miscellaneous]

## v2.3.0 - April 18th, 2025
### Added
- New option to disable the Activities section in server member lists [Miscellaneous]

### Changed
- Options related to Nitro are now all enabled by default
- Options not realted to Nitro are not all disabled by default

### Fixed
- Future additions are now propery added to the config file

## v2.2.0 - March 4th, 2025
### Added
- Made setting categories collapsable
- Re-added Channel category options

### Fixed
- Compatability with Invisible Typing Indicators (thanks [@Zacam](https://github.com/Zacam)!)

## v2.1.0 - February 24th, 2025
### Changed
- Renamed plugin to ChatButtonsBegone to prepare for BetterDiscord upload and ensure no conflicts with RemoveChatButtons

## v2.0.3 - February 17th, 2025
### Fixed
- Typo causing Quick Reactions to not be disabled when toggled

## v2.0.2 - February 15th, 2025
### Fixed
- Quick Reaction icons hidden when toggle is disabled
### Removed
- Removed all Channel section toggles (these will be added back in a future update)

## v2.0.1 - February 14th, 2025
### Added
- Seperated Quick Reactions and Add Reaction as two different toggles
### Fixed
- Quick Reactions not being removed when toggled
### Removed
- Temporarily removed Boost Bar toggle (this will be added back in a future update)

## v2.0.0 - February 13th, 2025
- Rewrote the plugin to remove the dependency on ZeresPluginLibrary
