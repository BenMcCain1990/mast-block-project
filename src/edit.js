/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

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
import { ColorPicker, PanelBody, DropdownMenu, SelectControl } from '@wordpress/components';
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

// Create an object for the selected user
const [ selectedUser, setSelectedUser ] = useState( null );

//fetch api data and convert to json
const [users, setUsers] = useState( [] );
const fetchUsers = async () => {
    const response = await apiFetch( {
        path: '/wp/v2/users/'
    } );
    const data = await response;
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

const mappedUsers = [
    // Set a default value when no user is selected.
    {
        value: 0,
		label: 'Select a user…',
		disabled: true,
    },
    // Spread the map of users into the array.
    ...users.map(
        ( user ) => {
            return {
                label: user.name,
                value: user.id,
                id: user.id,
                name: user.name,
                bio: user.description,
                avatar: user.avatar_urls[ 96 ] ?? 'https://www.gravatar.com/avatar/?d=mystery-person'
            };
        }
    )
]

const userDropdown = () => {
    const result = users.filter(user => user.id = 1);
    console.log(result);
};

	return (
		<>
			<InspectorControls>
                <PanelBody title="Users">
                    <SelectControl
                        label="Users"
                        options={ mappedUsers }
                        value={ selectedUser?.id || 0 }
                        onChange={ ( userId ) => {
                            const userFromUsers = mappedUsers.find( ( user ) => {
                                return user.id === parseInt( userId );
                            } );
                            setSelectedUser( userFromUsers );
                        } }
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
                { selectedUser ? (
                    <>
                        <RichText.Content
                            tagName="h2"
                            className="name"
                            value={selectedUser.name}
                        />

                        <img src={ selectedUser.avatar } />

                        <RichText.Content
                            tagName="p"
                            value={selectedUser.bio}
                        />
                    </> 
                ) : (
                    <div>
                        Please make a selection...
                    </div>
                ) }
            </div>
		</>
	);
}
