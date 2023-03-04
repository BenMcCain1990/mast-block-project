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
import { InspectorControls, useBlockProps, RichText } from '@wordpress/block-editor';


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

// Function to hanle the color change for text color and background color
const handleColorChange = ( newColor, colorAttribute ) => {
    setAttributes( {
        [ colorAttribute ]: newColor,
    } );
};


const blockProps = useBlockProps();

// Dummy Data. Insert API data here.
const userFetch = [
    {
        userName: "George Washington",
        userBio: "Hates the British"
    },
    {
        userName: "Abraham Lincoln",
        userBio: "Likes to cut down trees"
    }
]

//fetch api data and convert to json
fetch('https://benjamin-mccain-photography.local/wp-json/wp/v2/users')
    .then(res => res.json())
        .then(data => console.log(data));

	return (
		<>
			<InspectorControls>
                <PanelBody title="Users" initialOpen>
                    <DropdownMenu
                        label="Users"
                        controls={ [
                            {
                                title: 'User1',
                            },
                            {
                                title: 'User2'
                            },
                            {
                                title: 'User3'
                            }
                        ]}
                    />
                </PanelBody>
				<PanelBody title="Text Color" initialOpen>
					<ColorPicker
                        color={ textColor }
                        onChangeComplete={ ( color ) => handleColorChange( color.hex, 'textColor' ) }
                    />
				</PanelBody>
                <PanelBody title="Background Color" initialOpen>
					<ColorPicker
                        color={ backgroundColor }
                        onChangeComplete={ ( color ) => handleColorChange( color.hex, 'backgroundColor' ) }
                    />
				</PanelBody>
			</InspectorControls>

			<div class="container" { ...useBlockProps( {
                style: {
                    backgroundColor,
                    color: textColor,
                },
            }) }>
                <RichText.Content
                    tagName="h2"
                    value={userFetch[0].userName}
                />
                <RichText.Content
                    tagName="p"
                    value={userFetch[0].userBio}
                />
                <RichText.Content
                    tagName="h2"
                    value={userFetch[1].userName}
                />
                <RichText.Content
                    tagName="p"
                    value={userFetch[1].userBio}
                />
            </div>
		</>
	);
}
