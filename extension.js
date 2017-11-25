const vscode = require( 'vscode' );

function activate( context ) {
	/**
	 * Switches active and anchored position of the selection.
	 *
	 * @param {vscode.Selection} selection
	 * @returns {vscode.Selection} A new flipped selection instance.
	 */
	function reverseSelection( selection ) {
		return new vscode.Selection( selection.active, selection.anchor );
	}

	let filpCommand = vscode.commands.registerCommand( 'vscodeSelectionFlip.flip', function() {
		let editor = vscode.window.activeTextEditor;

		editor.selections = editor.selections.map( sel => reverseSelection( sel ) );
	} );

	context.subscriptions.push( filpCommand );
}

exports.activate = activate;