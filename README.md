
⚠️ **Note: This program is currently under heavy development and may be unstable. Use at your own risk.**

---

# Obsidian Companycards Plugin
With the Companycards plugin for [Obsidian](https://obsidian.md/), you can easily organize and manage your company contacts. Simply create a note with company information and use the plugin's features to quickly search and sort through your contacts. The plugin also helps you remember when your contacts were founded and keep track of the last time you met them.

## Installation

### Automatic

~~#### Disable `Safe Mode` in Obsidian to be able to install community plugins:~~
~~1. Go to the `Settings` menu and select `Community Plugins`.~~
~~1. In the `Community Plugins` menu, disable `Safe Mode`.~~

~~#### Install and enable `Companycards` plugin:~~
~~1. From the `Community Plugins` menu, click on `Browse`.~~
~~1. Search for the `Companycards` plugin.~~
~~1. Click the `Install` button to add the plugin.~~
~~1. In the `Community Plugins` menu, enable the `Companycards` plugin.~~

### Manual 
1. Download `main.js`, `manifest.json`, and `styles.css` from the latest [release](https://github.com/vbeskrovnov/obsidian-contacts/releases).
1. Create a directory `obsidian-contacts` in your Obsidian vault plugins directory: `<VaultFolder>/.obsidian/plugins/`. The final path should be `<VaultFolder>/.obsidian/plugins/obsidian-contacts`.
1. Move the downloaded files (`main.js`, `manifest.json`, and `styles.css`) into the newly created directory.(`<VaultFolder>/.obsidian/plugins/obsidian-contacts`)
1. Restart Obsidian app.
1. Enable `Companycards` plugin in the `Community plugins` settings tab.

## Usage
After enabling the plugin in the settings menu, you should see the contacts button appear in the left sidebar. Click it to open the Companies view in the right sidebar.

The plugin reads your companies folder, which can be changed in the settings, to render all your contacts in the right sidebar.

### Changing the Companies Folder
1. Go to the settings.
1. Find the "Companies" tab.
1. Change the value of "Companies Folder Location" to an existing folder.

https://user-images.githubusercontent.com/9114994/209376300-5d643e65-0f4d-41b8-be7f-565f3a05347c.mov

### Creating a New Company
1. Click the "Companies" factory icon in the left sidebar. The Companies view should be opened in the right sidebar.
1. Click the "Create" button in the opened Companies view in the right sidebar.
1. Fill out the created template. See an example below:
```
/---company---/
| key       | value                    |
| --------- | ------------------------ |
| Name      | carl                     |
| Last Name | johnson                  |
| Phone     | +1 555 555 5555          |
| Telegram  | @carlj567                |
| Linkedin  | linkedin.com/in/carlj567 |
| Founding  | 1966-12-06               |
| Last chat | 2022-12-06               |
| Friends   | [[Bob]] [[Sue]]          |
/---company---/
```
Feel free to add more rows, and leave existing ones empty. **Do not rename** existing keys, as they can be used by the plugin.

https://user-images.githubusercontent.com/9114994/209380539-7fe10d19-5d73-4435-a0de-f2c5805e0771.mov

### Searching for Companies
You can use different sorting options to find the required companies:
- Use sorting by founding to find companies with the nearest founding day.
- Use sorting by last contact date to find companies that you haven't talked to in a long time.
- Use sorting by name to find a specific company.

https://user-images.githubusercontent.com/9114994/209383369-d7fc0a42-d1df-4980-93e0-46a8541b00b5.mov

## Company File Formats
Any of the following formats can be used for storing company data in Obsidian files. The default for new companies is `Custom Format`, but this behavior can be changed in the settings using the `Company File Template` menu item.

### (Default) Custom Format
The default format used by this plugin is the markdown table for storing Companies data. 
```
/---company---/
| key       | value                    |
| --------- | ------------------------ |
| Name      | carl                     |
| Last Name | johnson                  |
| Phone     | +1 555 555 5555          |
| Telegram  | @carlj567                |
| Linkedin  | linkedin.com/in/carlj567 |
| Founding  | 1966-12-06               |
| Last chat | 2022-12-06               |
| Friends   | [[Bob]] [[Sue]]          |
/---company---/
```

### Frontmatter Format

The [Frontmatter](https://help.obsidian.md/Advanced+topics/YAML+front+matter) format is used by Obsidian as metadata for files and is also supported by the [Dataview](https://github.com/blacksmithgu/obsidian-dataview) plugin, allowing you to build queries for your companies.

> :warning: **Do not change or remove `type` field**. It is used to detect if the current file is a company.

> :warning: **It needs to be placed at the very top of the file**. Be very careful here!

```
---
name:
  first: carl
  last: johnson
phone: +1 555 555 5555
telegram: @carlj567 
linkedin: linkedin.com/in/carlj567
founding: 1966-12-06 
last_chat: 2022-12-06 
friends: "[[Bob]] [[Sue]]"
type: company
---
```
