# 🚀 Google Drive Direct Link Generator

> A small client-side utility that converts supported Google Drive sharing links for uploaded files into Google Drive download-style URLs.

## ✨ Features

- **Instant Conversion**: Generates the conventional `uc?export=download&id=...` URL locally.
- **Client-Side Conversion**: The entered Drive URL is processed in the browser and is not sent to an application backend.
- **Modern UI**: Clean, responsive interface with copy/paste helpers.
- **Validation**: Accepts supported `drive.google.com` link formats and rejects unrelated hosts.
- **Versatile**: Supports the common `/file/d/FILE_ID`, `/d/FILE_ID`, and `?id=FILE_ID` forms.

> The page itself loads Google Fonts and Font Awesome from third-party CDNs.

## 🛠️ Supported Link Formats

Examples:

- `https://drive.google.com/file/d/FILE_ID/view?usp=drive_link`
- `https://drive.google.com/file/d/FILE_ID/view`
- `https://drive.google.com/open?id=FILE_ID`

Generated form:

`https://drive.google.com/uc?export=download&id=FILE_ID`

## 🚀 How It Works

1. **Paste** a supported Google Drive sharing link.
2. **Generate** the download-style URL.
3. **Copy** the generated link.

The generated URL can bypass the normal Drive viewer for downloadable uploaded files, but Google Drive remains in control of access and delivery and may still interpose confirmation, quota, access, or virus-scan pages.

## 📖 Usage Guide

1. Open the hosted page or `index.html` in a modern browser.
2. Paste a supported Google Drive file URL.
3. Click **Generate**.
4. Click **Copy** to copy the generated URL.

## Technologies Used

- **HTML5**
- **CSS3**
- **JavaScript (Vanilla)**
- **Font Awesome**
- **Google Fonts**

## 📝 Limitations

- The `/uc?export=download&id=...` form is a commonly used Google Drive URL pattern, not a documented stable API contract.
- The file must be accessible to the recipient, and downloading must be allowed by the owner's sharing settings.
- Large or high-traffic files may trigger additional confirmation, virus-scan, or quota handling instead of an immediate download.
- Native Google Docs, Sheets, and Slides are not supported by this converter; those files require format-specific export URLs.
- Google Drive behavior can change, so generated links should be tested for the intended recipient/use case.

---

<p align="center">
  Made with ❤️ by <a href="https://falker47.github.io/Nexus-portfolio/">Maurizio Falconi</a>
</p>
