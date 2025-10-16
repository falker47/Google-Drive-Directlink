# Google Drive Direct Link Generator

Una semplice webapp che converte i link di condivisione di Google Drive in link di download diretto.

## Come funziona

1. **Incolla il link di Google Drive**: Copia e incolla un link di condivisione di Google Drive nel campo di input
2. **Genera il link diretto**: Clicca sul pulsante "Generate" per convertire il link
3. **Copia il risultato**: Usa il pulsante "Copy" per copiare il link diretto negli appunti

## Formato dei link supportati

L'applicazione supporta diversi formati di link Google Drive:

- `https://drive.google.com/file/d/FILE_ID/view?usp=drive_link`
- `https://drive.google.com/file/d/FILE_ID/view`
- `https://drive.google.com/open?id=FILE_ID`

## Esempio

**Input:**
```
https://drive.google.com/file/d/1BFxYaN_8295KG1pW0zYgoU1dL0kQc3Zs/view?usp=drive_link
```

**Output:**
```
https://drive.google.com/uc?export=download&id=1BFxYaN_8295KG1pW0zYgoU1dL0kQc3Zs
```

## Caratteristiche

- ✅ Interfaccia moderna e responsive
- ✅ Validazione automatica dei link
- ✅ Copia negli appunti con un click
- ✅ Notifiche toast per feedback utente
- ✅ Esempio integrato per test rapidi
- ✅ Supporto per diversi formati di URL Google Drive

## Come utilizzare

1. Apri `index.html` nel tuo browser
2. Incolla un link Google Drive nel campo di input
3. Clicca "Generate" per ottenere il link diretto
4. Usa "Copy" per copiare il risultato

## Tecnologie utilizzate

- HTML5
- CSS3 (con gradienti e animazioni)
- JavaScript vanilla
- Font Awesome per le icone
- Google Fonts (Inter)

## Note

- Il link diretto generato può essere utilizzato per scaricare direttamente il file senza passare attraverso l'interfaccia di Google Drive
- Funziona con file pubblici o condivisi pubblicamente
- L'applicazione è completamente client-side e non invia dati a server esterni
