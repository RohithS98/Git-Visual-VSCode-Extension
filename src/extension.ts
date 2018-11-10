'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { GitExtension, API, Commit as GitAPI, Repository, Commit } from './git';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

const gitExtension = vscode.extensions.getExtension<GitExtension>('vscode.git').exports;
const api = gitExtension.getAPI(1);

const rootPath = vscode.workspace.rootPath;


async function getCommitDetails(commit : Commit): Promise<string> {
    if(commit.parents.length == 0){
        return commit.message+"\n"+commit.hash+"\n\n"
    }
    console.log(commit.message, commit.parents[0]);
    var par = await api.repositories[0].getCommit(commit.parents[0]);
    var str1 = await getCommitDetails(par);
    return commit.message+"\n"+commit.hash + "\n\n" + str1;
}

export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "gitvisual" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', async () => {
        // The code you place here will be executed every time your command is executed
        var headB = api.repositories[0].state.HEAD;
        var comName = headB.commit;
        var com = await api.repositories[0].getCommit(comName);
        console.log("Got HEAD commit");
        var text = await getCommitDetails(com);
        console.log("Got commit history");
        if(com){
            var setting: vscode.Uri = vscode.Uri.parse("untitled:" + "C:\githistory.txt");
            vscode.workspace.openTextDocument(setting).then((a: vscode.TextDocument) => {
                vscode.window.showTextDocument(a, 1, false).then(e => {
                    e.edit(edit => {
                        edit.insert(new vscode.Position(0, 0), text);
                    });
                });
            }, (error: any) => {
                console.error(error);
                debugger;
            });
        }
        else{
            console.error("Commit not found. Try again");
        }

        console.log(headB)
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}