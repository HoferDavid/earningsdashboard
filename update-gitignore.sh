#!/bin/bash

# Definiere den Pfad der zentralen .gitignore-Datei
CENTRAL_GITIGNORE=".gitignore"

# Backup der zentralen .gitignore erstellen (optional)
cp "$CENTRAL_GITIGNORE" "${CENTRAL_GITIGNORE}.backup"

# Zentrale .gitignore-Datei leeren
> "$CENTRAL_GITIGNORE"

# Einträge aus frontend/.gitignore hinzufügen
if [ -f frontend/.gitignore ]; then
    echo "# Frontend .gitignore" >> "$CENTRAL_GITIGNORE"
    cat frontend/.gitignore >> "$CENTRAL_GITIGNORE"
    echo "" >> "$CENTRAL_GITIGNORE"
fi

# Einträge aus backend/.gitignore hinzufügen
if [ -f backend/.gitignore ]; then
    echo "# Backend .gitignore" >> "$CENTRAL_GITIGNORE"
    cat backend/.gitignore >> "$CENTRAL_GITIGNORE"
    echo "" >> "$CENTRAL_GITIGNORE"
fi

echo "Central .gitignore has been updated!"
