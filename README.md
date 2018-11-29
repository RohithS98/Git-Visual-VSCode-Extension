# gitvisual README

## Features

Displays the commit history for the current branch in any local repository created with git.
It displays the commit message and hash. Newer commits appear at the top of the file.

## Usage

1. Download the extension and open with VSCode. In the folder run 

`>npm i`

This will install all the dependencies.

2. After this, run it in developer mode(Press F5).

3. Open the required repository.

4. Use ctrl + shift + p to open command palette.

5. Run Git Visual History V2 command.

6. The Git Visual will open in a new file.

7. Click on the "Get Git History" button to display the history below

Moving the mouse over a commit will show its commit message.

In case an error message saying "Extension not found" appears, reload the developer mode. If the issue persists, then dependencies were not installed.

In case an error message saying "Cannot read property 'state' of undefined", wait for the editor to load fully and retry.

## Release Notes

## 2 (Current Release)

Added GUI and small animations.

### 1 

Only text history for current branch is displayed in a text file.
