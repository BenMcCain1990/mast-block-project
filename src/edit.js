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
import { useState, useEffect } from '@wordpress/element';
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


//fetch api data and convert to json
const [users, setUsers] = useState( [] );
const fetchUsers = async () => {
    const response = await fetch(
        'https://benjamin-mccain-photography.local/wp-json/wp/v2/users'
    );
    const data = await response.json();
        setUsers(data);
};

useEffect(() => {
    fetchUsers();
}, []);

/*const userDropdown = () => {
    users.forEach(user => {
        const markup = `<h2>${user.name}<h2/>`;
        const markup2 = `<p>${user.id}<p/>`;
        document.querySelector('.name').insertAdjacentHTML('beforebegin', markup);
        document.querySelector('p').insertAdjacentHTML('beforebegin', markup2);
    })
};*/

const userDropdown = () => {
    const result = users.filter(user => user.id = 1);
    console.log(result);
};

	return (
		<>
			<InspectorControls>
                <PanelBody title="Users">
                    <DropdownMenu
                        label="Users"
                        controls={ users.map(user => ( {title: user.name, onClick: userDropdown } ))}
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
                    className="name"
                    value={users.name}
                />
                <RichText.Content
                    tagName="p"
                    value={users.id}
                />
                <RichText.Content
                    tagName="p"
                    value={users.bio}
                />
            </div>
		</>
	);
}
