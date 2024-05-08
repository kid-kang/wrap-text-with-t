const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('extension.wrapWithT', function () {

    // 获取当前活动的文本编辑器
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      // 如果没有打开的编辑器，显示错误消息
      vscode.window.showErrorMessage('No editor is open');
      return;
    }

    // 获取用户在当前编辑器中选择的文本范围  
    const selection = editor.selection;
    if (selection.isEmpty) {
      // 如果没有选择任何文本，显示错误消息  
      vscode.window.showErrorMessage('No text is selected');
      return;
    }

    // 检查选中的文本是否包含多行  
    if (selection.start.line !== selection.end.line) {
      // 如果选中多行，显示错误消息  
      vscode.window.showErrorMessage('Selection spans multiple lines, which is not supported.');
      return;
    }

    // 获取用户选择的文本内容  
    const selectedText = editor.document.getText(selection);
    // 获取选择文本在第几行
    const selectedLine = selection.start.line;
    // 获取所替换文本开始和结束位子的下标
    let replaceStartIndex = selection.start.character;
    let replaceEndIndex = selection.end.character;
    // 获取选中文本所在的行文本  
    const lineText = editor.document.lineAt(selection.start.line).text;
    // 获取选中文本外前后的字符  
    const selectedFrontChar = replaceStartIndex > 0 ? lineText[replaceStartIndex - 1] : '';
    const selectedAfterChar = replaceEndIndex < lineText.length ? lineText[replaceEndIndex] : '';

    // 判断是否需要加{}
    let isJSX = false;
    if (selectedFrontChar) {
      if (selectedFrontChar === ">" || selectedFrontChar === " " || ((replaceStartIndex > 1 ? lineText[replaceStartIndex - 2] : '') === "=")) {
        isJSX = true;
      }
    }

    // 检查是否要去除选中外两边的引号
    if (selectedFrontChar === selectedAfterChar && (selectedFrontChar === '"' || selectedFrontChar === "'")) {
      // 如果选择外部的两边都是相同的引号，则调整选择范围以去除它们  
      replaceStartIndex = replaceStartIndex - 1;
      replaceEndIndex = replaceEndIndex + 1;
    }

    try {
      // 执行替换操作  
      editor.edit(editBuilder => {
        editBuilder.replace(
          new vscode.Range(new vscode.Position(selectedLine, replaceStartIndex), new vscode.Position(selectedLine, replaceEndIndex)),
          isJSX ? `{t("${selectedText}")}` : `t("${selectedText}")`
        );
      });
      // 如果编辑成功，可以选择性地通知用户  
      vscode.window.showInformationMessage(`Wrapped text with t.`);
    } catch (error) {
      // 如果编辑失败，显示错误消息  
      vscode.window.showErrorMessage(`Failed to wrap text: ${error}`);
    }
  });

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
  activate,
  deactivate,
};
