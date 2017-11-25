/* global suite, test */

const assert = require( 'assert' ),
	vscode = require( 'vscode' ),
	vscodeTestContent = require( 'vscode-test-content' );

suite( 'Selection', function() {
	test( 'it toggles from end', () => {
		return vscodeTestContent.setWithSelection( 'foo [bar} baz' )
			.then( textEditor => vscode.commands.executeCommand( 'vscodeSelectionFlip.flip' ).then( () => textEditor ) )
			.then( textEditor => {
				assert.equal( vscodeTestContent.getWithSelection( textEditor ), 'foo {bar] baz', 'Anchor point was not moved to the start' );
			} );
	} );

	test( 'it toggles from start', () => {
		return vscodeTestContent.setWithSelection( 'foo {bar] baz' )
			.then( textEditor => vscode.commands.executeCommand( 'vscodeSelectionFlip.flip' ).then( () => textEditor ) )
			.then( textEditor => {
				assert.equal( vscodeTestContent.getWithSelection( textEditor ), 'foo [bar} baz', 'Anchor point was not moved to the end' );
			} );
	} );

	test( 'it doesn\'t affect collapsed selection', () => {
		const contentWithSelection = 'foo ba^r baz';

		return vscodeTestContent.setWithSelection( contentWithSelection )
			.then( textEditor => vscode.commands.executeCommand( 'vscodeSelectionFlip.flip' ).then( () => textEditor ) )
			.then( textEditor => {
				assert.equal( vscodeTestContent.getWithSelection( textEditor ), contentWithSelection, 'Selection should remain unaffected' );
			} );
	} );

	test( 'it supports multiple selections', () => {
		return vscodeTestContent.setWithSelection( 'foo [bar} {baz]' )
			.then( textEditor => vscode.commands.executeCommand( 'vscodeSelectionFlip.flip' ).then( () => textEditor ) )
			.then( textEditor => {
				assert.equal( vscodeTestContent.getWithSelection( textEditor ), 'foo {bar] [baz}', 'Anchor points were not flipped' );
			} );
	} );
} );