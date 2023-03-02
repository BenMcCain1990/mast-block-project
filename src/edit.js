/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * Importing native color picker component
 */
import { ColorPicker, PanelBody, DropdownMenu } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import {
    more,
    arrowLeft,
    arrowRight,
    arrowUp,
    arrowDown,
} from '@wordpress/icons';
import usericon from './Images/usericon.png';

function Example() {
    const [color, setColor] = useState();
    return (
        <ColorPicker
            color={color}
            onChange={setColor}
            enableAlpha
            defaultValue="#000"
        />
    );
}
const MyDropdownMenu = () => (
    <DropdownMenu
        icon={ more }
        label="Select a direction"
        controls={ [
            {
                title: 'Up',
                icon: arrowUp,
                onClick: () => console.log( 'up' ),
            },
            {
                title: 'Right',
                icon: arrowRight,
                onClick: () => console.log( 'right' ),
            },
            {
                title: 'Down',
                icon: arrowDown,
                onClick: () => console.log( 'down' ),
            },
            {
                title: 'Left',
                icon: arrowLeft,
                onClick: () => console.log( 'left' ),
            },
        ] }
    />
);
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( props ) {
    
const { attributes, setAttributes } = props;

// Destructure the attributes 
const {
    backgroundColor,
    textColor
} = attributes;

const handleColorChange = ( newColor, colorAttribute ) => {
    setAttributes( {
        [ colorAttribute ]: newColor,
    } );
};

	return (
		<>
			<InspectorControls>
				<PanelBody title="Color Picker" initialOpen>
					<Example 
                    color={ textColor }
                    onChangeComplete={ ( color ) => handleColorChange( color.hex, 'textColor' ) }
                    />
				</PanelBody>
                <PanelBody title="User Dropdown" initialOpen>
                    <MyDropdownMenu/>
                </PanelBody>
			</InspectorControls>

			<div class="container" { ...useBlockProps( {
                style: {
                    backgroundColor,
                    color: textColor,
                },
            }) }>
                <h1>Title</h1>
                <input className="title-input" type="text"></input>
                <h1>Body</h1>
                <input className="body-input" type="text"></input>
                <button type="submit">Submit</button>
            </div>
		</>
	);
}
