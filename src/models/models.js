export const Email = {
    label: "",
    button: "",
    visible: false,
    include_image_inline: false,
    inblude_image_download_link: false,
    include_video_download_link: false,
}

export const ConditionalItem = {
    $and: [],
    $or: [],
}

export const GroupItem = {
    key: "",
    name: "",
    title: "",
    default: "",
    isPlaceholder: false,

}

export const Group = {
    key: "",
    type: "",
    label: "",
    ofac_check: false,
    facial_recognition: false,
    lines: 1,
    data_field: "",
    items: GroupItem,
    default: "",
    only_send_if: "",
    required: false,
    pre_post: false,
    pre_label: "",
    post_label: "",
    scrollable: false,
    inline_media: false,
    require_inline_media: false,
    isPlaceholder: false,
    temp: false,
    conditional: ConditionalItem,
    conditionalSourceField: "",
    conditionalValue: "",

}

export const fieldOptions = {
    selected: null,
    templates: [
        { type: 'AcuantButton' },
        { type: 'AcuantTextbox' },
        { type: 'Checkbox' },
        { type: 'CommentLog' },
        { type: 'DateSelector' },
        { type: 'HTMLLabel' },
        { type: 'Label' },
        { type: 'MultiDropDownList' },
        { type: 'PassFail' },
        { type: 'Radio' },
        { type: 'SingleDropDownList' },
        { type: 'Textbox' }
    ]
};

export const LogicBranchValue = {
    value: "",
    action: "",
}

export const LogicBranchOption = {
    id: "",
    label: "",
    value: "" | null,
}

export const LogicBranch = {
    values: LogicBranchValue,
    options: LogicBranchOption,
    variable: "",
}

export const Notation = {
    rank: 1,
    title: "",
    autonav: false,
}

export const TabBarItem = {
    id: "",
    url: "",
    title: "",
    image_name: "",
}

export const ReferenceEntry = {
    description: "",
    prompt: "",
    temp: false,
}

export const WorkflowModule = {
    key: "",
    name: "",
    home: false,
    reference_entry: ReferenceEntry,
    keyboard_autocapitalization_type: "",
    tab_bar_item: TabBarItem,
    notations: Notation,
    logic_branch: LogicBranch,
    groups: Group,
    allowmultiselect: false,
    form_template_id: "",
    label: "",
    email: Email,
}

export const FieldMap = {
    dst: "",
    src: "",
}

export const WorkflowTemplate = {
    key: "",
    modules: WorkflowModule,
    field_map: FieldMap,
    force_upload_dialog_visibility: false,
}

export const Workflow = {
    template: WorkflowTemplate,
}

export const Tab = {
    number: 1,
    key: "",
    title: "",
    isActive: false,
    groups: Group,
}

export const TabOption = {
    type: "",
    title: "",
    temp: false,
}

export const tabOptionArray = {
    templates: TabOption,
    temp: false,
}

export const AppliesTo = {
    type: "",
    temp: false,
}

export const FieldOption = {
    Option: "",
    Name: "",
    Type: "",
    Applies_To: AppliesTo,
    Description: "",
    Default: [],
    Main_Property: false,
    temp: false,
}

export const fieldAttributeArray = {
    templates: FieldOption,
    temp: false,
}

export const workflowOptionsArray = {
    forced_upload_mode: "",
    force_upload_dialog_visibility: false,
    session_ended_prompt: "",
    session_length: 1,
    disable_microphone: false,
    required_terms_prompt: "",
    intro_video_url: "",
    temp: false,
}

export const referenceCaptureArray = {
    key: "",
    reference_entry: ReferenceEntry,
    keyboard: "",
    no_spaces_allowed: false,
    keyboard_autocapitalization_type: "",
    asset_autocomplete: "",
    asset_data: "",
    ref_num_lock: "",
    temp: false,
}

export const Notations = {
    title: "",
    rank: 1,
    temp: false,
}

export const notationsOptionsArray = {
    notations: Notations,
    allowmultiselect: false,
    temp: false,
}

export const mediaOptionsArray = {
    forced_resolution: "",
    forced_native_mode: false,
    hide_photo_button: false,
    hide_video_button: false,
    photo_button_primary: false,
    instructions: [""],
    new_instructions: [""],
    update_instructions: [""],
    close_instructions: [""],
    temp: false,
}

export const mediaInstructionOptionsArray = {
    auto_advance: false,
    autonav: false,
    label: "",
    image_url: "",
    text_color: "",
    text_size: 1,
    temp: false,
}

export const digitalFormsOptionsArray = {
    name: "",
    form_template_id: "",
    temp: false,
}

export const emailOptionsArray = {
    send_to_remember: false,
    include_bcc: "",
    addresses_copied_to: "",
    visible: false,
    send_to_text_default: "",
    template: "",
    temp: false,
}

export const GroutItemKeyNotations = {
    name: "",
    label: "",
    temp: false,
}

export const CDWText = {
    accept_text: "",
    decline_text: "",
    result_accept_text: "",
    result_decline_text: "",
    temp: false,
}

export const uploadOptionsArray = {
    signature_logo_url: "",
    signature_required: false,
    allow_multiple_signatures: false,
    required_signature_count: 1,
    required_photo_count: 1,
    required_video_count: 1,
    group_item_key_notations: GroutItemKeyNotations,
    check_in_label: "",
    email_autocomplete: "",
    agreement_url: "",
    show_cdw: false,
    cdw_text: CDWText,
    temp: false,
}

export const tabOptions = {
    templates: [
        { type: 'Checklist', title: 'Checklist' },
        { type: 'PDF', title: 'PDF' },
        { type: 'Media', title: 'Media' },
        { type: 'Share', title: 'Share' },
        { type: 'Upload', title: 'Upload' }
    ]
}

export const fieldAttributes = {
    templates: [
        {
            Option: 'Default',
            Name: 'default',
            Type: 'String',
            Applies_To: [
                { type: 'AcuantButton' },
                { type: 'AcuantTextbox' },
                { type: 'Checkbox' },
                { type: 'DateSelector' },
                { type: 'HTMLLabel' },
                { type: 'Label' },
                { type: 'MultiDropDownList' },
                { type: 'PassFail' },
                { type: 'Radio' },
                { type: 'SingleDropDownList' },
                { type: 'Textbox' }
            ],
            Description: 'Adds specified text as the default value for the FormControl it is set on. Radio/SingleDropDown: default value must match one of the options. PassFail: default must be “pass” or “fail”. Checkbox: default must be “true” or “false”. MultiSelect: default is comma separated list that must match options',
            Default: null,
            Main_Property: false
        },
        {
            Option: 'Required',
            Name: 'required',
            Type: 'String',
            Applies_To: [
                { type: 'AcuantTextbox' },
                { type: 'CommentLog' },
                { type: 'DateSelector' },
                { type: 'PassFail' },
                { type: 'Radio' },
                { type: 'SingleDropDownList' },
                { type: 'Textbox' }
            ],
            Description: 'Make a form control required and user will have to fill it out to complete transaction.',
            Default: false,
            Main_Property: true
        },
        {
            Option: 'Read Only',
            Name: 'readonly',
            Type: 'String',
            Applies_To: [
                { type: 'AcuantButton' },
                { type: 'AcuantTextbox' },
                { type: 'Checkbox' },
                { type: 'CommentLog' },
                { type: 'DateSelector' },
                { type: 'MultiDropDownList' },
                { type: 'PassFail' },
                { type: 'Radio' },
                { type: 'SingleDropDownList' },
                { type: 'Textbox' }
            ],
            Description: 'Will make Control readonly: “true”, “false”, “mobile”, “web”. Can also make it readonly explicitly on mobile vs web(drafts)',
            Default: 'false',
            Main_Property: false
        },
        {
            Option: 'Lines',
            Name: 'lines',
            Type: 'Integer',
            Applies_To: [
                { type: 'AcuantButton' },
                { type: 'AcuantTextbox' },
                { type: 'Checkbox' },
                { type: 'CommentLog' },
                { type: 'DateSelector' },
                { type: 'HTMLLabel' },
                { type: 'Label' },
                { type: 'MultiDropDownList' },
                { type: 'PassFail' },
                { type: 'Radio' },
                { type: 'SingleDropDownList' },
                { type: 'Textbox' }
            ],
            Description: 'Number of lines in the Textbox',
            Default: '1',
            Main_Property: false
        },
        {
            Option: 'Keyboard',
            Name: 'keyboard',
            Type: 'String',
            Applies_To: [
                { type: 'AcuantTextbox' },
                { type: 'Textbox' }
            ],
            Description: 'One of: ”numeric”, ”numeric_and_punctuation”, ”email”',
            Default: null,
            Main_Property: true
        },
        {
            Option: 'Keyboard Autocapitalization Type',
            Name: 'keyboard_autocapitalization_type',
            Type: 'String',
            Applies_To: [
                { type: 'AcuantTextbox' },
                { type: 'Textbox' }
            ],
            Description: 'One of: “none”, “first_letter”, “all_letters”',
            Default: null,
            Main_Property: true
        },
        {
            Option: 'In/Out Control',
            Name: 'pre_post',
            Type: 'Boolean',
            Applies_To: [
                { type: 'AcuantTextbox' },
                { type: 'Checkbox' },
                { type: 'DateSelector' },
                { type: 'HTMLLabel' },
                { type: 'MultiDropDownList' },
                { type: 'PassFail' },
                { type: 'Radio' },
                { type: 'SingleDropDownList' },
                { type: 'Textbox' }
            ],
            Description: 'Set to true to use in/out control style',
            Default: false,
            Main_Property: true
        },
        {
            Option: 'In Label',
            Name: 'post_label',
            Type: 'String',
            Applies_To: [
                { type: 'AcuantTextbox' },
                { type: 'Checkbox' },
                { type: 'DateSelector' },
                { type: 'HTMLLabel' },
                { type: 'MultiDropDownList' },
                { type: 'PassFail' },
                { type: 'Radio' },
                { type: 'SingleDropDownList' },
                { type: 'Textbox' }
            ],
            Description: 'String that will be shown on Close transaction as the label for new value',
            Default: 'In',
            Main_Property: true
        },
        {
            Option: 'Out Label',
            Name: 'pre_label',
            Type: 'String',
            Applies_To: [
                { type: 'AcuantTextbox' },
                { type: 'Checkbox' },
                { type: 'DateSelector' },
                { type: 'HTMLLabel' },
                { type: 'MultiDropDownList' },
                { type: 'PassFail' },
                { type: 'Radio' },
                { type: 'SingleDropDownList' },
                { type: 'Textbox' }
            ],
            Description: 'String that will be shown on Close transaction as the label for previous value.',
            Default: 'Out',
            Main_Property: true
        },
        {
            Option: 'Min. Value',
            Name: 'min_value',
            Type: 'Integer',
            Applies_To: [
                { type: 'AcuantTextbox' },
                { type: 'Textbox' }
            ],
            Description: 'Sets a minimum value for 1 that will be entered. Must be Textbox with numeric keyboard.',
            Default: null,
            Main_Property: false
        },
        {
            Option: 'Max. Value',
            Name: 'max_value',
            Type: 'Integer',
            Applies_To: [
                { type: 'AcuantTextbox' },
                { type: 'Textbox' }
            ],
            Description: 'Sets a maximum value for 1 that will be entered. Must be Textbox with numeric keyboard.',
            Default: null,
            Main_Property: false
        },
        {
            Option: 'OFAC Check',
            Name: 'ofac_check',
            Type: 'Boolean',
            Applies_To: [
                { type: 'AcuantButton' }
            ],
            Description: 'Added to PassFail that will be used with AcuantButton to show status of ofac check.',
            Default: false,
            Main_Property: false
        },
        {
            Option: 'Facial Recognition',
            Name: 'facial_recognition',
            Type: 'Boolean',
            Applies_To: [
                { type: 'AcuantButton' }
            ],
            Description: 'Added to PassFail that will be used with AcuantButton to show status of facial recognition',
            Default: false,
            Main_Property: false
        },
        {
            Option: 'Clear',
            Name: 'clear',
            Type: 'String',
            Applies_To: [
                { type: 'AcuantTextbox' },
                { type: 'Checkbox' },
                { type: 'CommentLog' },
                { type: 'DateSelector' },
                { type: 'MultiDropDownList' },
                { type: 'PassFail' },
                { type: 'Radio' },
                { type: 'SingleDropDownList' },
                { type: 'Textbox' }
            ],
            Description: 'Will clear form control value in update and/or close transactions: Values are: “update” or “close” or “always”',
            Default: null,
            Main_Property: false
        },
        {
            Option: 'Inline Media',
            Name: 'inline_media',
            Type: 'Boolean',
            Applies_To: [
                { type: 'Checkbox' },
                { type: 'PassFail' },
                { type: 'Radio' },
                { type: 'SingleDropDownList' },
                { type: 'Textbox' }
            ],
            Description: 'Allows users to add photos related to a checklist item during the checkout/return process.',
            Default: false,
            Main_Property: true
        },
        {
            Option: 'Require Inline Photo',
            Name: 'require_inline_photo',
            Type: 'Boolean',
            Applies_To: [
                { type: 'Checkbox' },
                { type: 'PassFail' },
                { type: 'Radio' },
                { type: 'SingleDropDownList' },
                { type: 'Textbox' }
            ],
            Description: 'Users can require photos for the checklist item',
            Default: false,
            Main_Property: true
        }
    ]
}

export const workflowAttributes = {
    templates: [
        {
            Option: 'Force Upload Mode',
            Name: 'forced_upload_mode',
            Type: 'String',
            Applies_To: [],
            Description: '“offline” : <br>-  Create transactions without pinging server and without uploading<br>-  Transactions are pending until user changes app Settings - Upload Mode<br>“online” :<br>-  App will use Wifi and/or Mobile Data to ping server and upload transactions<br>“wifi_only” :<br>-  App will use Wifi to ping server and upload transactions<br>-  Mobile data will not be used<br>“online_wifi_uploads”:<br>-  Uses mobile data to ping server for Updates/Returns, or to populate asset data for clients who use CSV import feature<br>-  Uploads only when device connects to Wi-Fi<br>-  Minimizes mobile data usage',
            Default: null,
            Main_Property: true
        },
        {
            Option: 'Upload Dialog Visibility',
            Name: 'force_upload_dialog_visibility',
            Type: 'Boolean',
            Applies_To: [],
            Description: 'Show upload progress dialog for each Transaction',
            Default: null,
            Main_Property: true
        },
        {
            Option: 'Session Ended Prompt',
            Name: 'session_ended_prompt',
            Type: 'String',
            Applies_To: [],
            Description: 'Message shown to user when session has expired',
            Default: null,
            Main_Property: false
        },
        {
            Option: 'Session Length',
            Name: 'session_length',
            Type: 'Integer',
            Applies_To: [],
            Description: 'Minutes until session timeout',
            Default: null,
            Main_Property: false
        },
        {
            Option: 'Disable Microphone',
            Name: 'disable_microphone',
            Type: 'Boolean',
            Applies_To: [],
            Description: 'Disable microphone while recording video',
            Default: null,
            Main_Property: false
        },
        {
            Option: 'Required Terms Prompt',
            Name: 'required_terms_prompt',
            Type: 'String',
            Applies_To: [],
            Description: 'Message shown to the user at login',
            Default: null,
            Main_Property: false
        },
        {
            Option: 'Intro Video URL',
            Name: 'intro_video_url',
            Type: 'String',
            Applies_To: [],
            Description: 'Url for video to be shown when the user signs in',
            Default: null,
            Main_Property: false
        },
        {
            Option: 'Default Reference Capture',
            Name: 'key',
            Type: 'String',
            Applies_To: [],
            Description: '',
            Default: undefined,
            Main_Property: false
        },
        {
            Option: 'Reference Entry Description',
            Name: 'description',
            Type: 'String',
            Applies_To: [],
            Description: '',
            Default: 'Name your new record, or enter a reference 1.',
            Main_Property: false
        },
        {
            Option: 'Reference Entry Prompt',
            Name: 'prompt',
            Type: 'String',
            Applies_To: [],
            Description: '',
            Default: 'Enter name or reference 1',
            Main_Property: false
        },
        {
            Option: 'Keyboard',
            Name: 'keyboard',
            Type: 'String',
            Applies_To: [],
            Description: '',
            Default: '',
            Main_Property: false
        },
        {
            Option: 'No Spaces Allowed',
            Name: 'no_spaces_allowed',
            Type: 'Boolean',
            Applies_To: [],
            Description: '',
            Default: false,
            Main_Property: false
        },
        {
            Option: 'Auto-capitalization',
            Name: 'keyboard_autocapitalization_type',
            Type: 'String',
            Applies_To: [],
            Description: 'Directs mobile client to capitalize either all letters, the first letter in a sentence or turns off auto-capitalization, respectively.',
            Default: 'none',
            Main_Property: false
        },
        {
            Option: 'Asset Autocomplete',
            Name: 'asset_autocomplete',
            Type: 'String',
            Applies_To: [],
            Description: 'URL to query when typing characters in reference capture textbox. = {SEARCH} will be replaced with the characters.',
            Default: '',
            Main_Property: true
        },
        {
            Option: 'Asset Data',
            Name: 'asset_data',
            Type: 'String',
            Applies_To: [],
            Description: 'URL to query for asset data given the= {ID} returned by the asset autocomplete call.',
            Default: '',
            Main_Property: true
        },
        {
            Option: 'Reference Number Locking',
            Name: 'ref_num_lock',
            Type: 'String',
            Applies_To: [],
            Description: 'Allows control over the ability to create new units via the Record360 mobile app. This allows managers to maintain accurate and consistent data about their inventory.',
            Default: 'open',
            Main_Property: true
        },

        {
            Option: 'Notations Title',
            Name: 'title',
            Type: 'String',
            Applies_To: [],
            Description: 'List of all notations keywords will be available for tagging photos',
            Default: [],
            Main_Property: false
        },
        {
            Option: 'Notations Rank',
            Name: 'rank',
            Type: 'Integer',
            Applies_To: [],
            Description: 'List of all notations keywords will be available for tagging photos',
            Default: undefined,
            Main_Property: false
        },
        {
            Option: 'Allow Multiselect',
            Name: 'allowmultiselect',
            Type: 'Boolean',
            Applies_To: [],
            Description: 'Allows more than one notation tag on a single photo',
            Default: false,
            Main_Property: false
        }
    ]
}

export const referenceCaptureAttributes = {
    templates: [
        {
            Option: 'Default Reference Capture',
            Name: 'key',
            Type: 'String',
            Applies_To: [],
            Description: '',
            Default: undefined,
            Main_Property: false
        },
        {
            Option: 'Reference Entry Description',
            Name: 'description',
            Type: 'String',
            Applies_To: [],
            Description: '',
            Default: 'Name your new record, or enter a reference 1.',
            Main_Property: false
        },
        {
            Option: 'Reference Entry Prompt',
            Name: 'prompt',
            Type: 'String',
            Applies_To: [],
            Description: '',
            Default: 'Enter name or reference 1',
            Main_Property: false
        },
        {
            Option: 'Keyboard',
            Name: 'keyboard',
            Type: 'String',
            Applies_To: [],
            Description: '',
            Default: '',
            Main_Property: false
        },
        {
            Option: 'No Spaces Allowed',
            Name: 'no_spaces_allowed',
            Type: 'Boolean',
            Applies_To: [],
            Description: '',
            Default: false,
            Main_Property: false
        },
        {
            Option: 'Auto-capitalization',
            Name: 'keyboard_autocapitalization_type',
            Type: 'String',
            Applies_To: [],
            Description: 'Directs mobile client to capitalize either all letters, the first letter in a sentence or turns off auto-capitalization, respectively.',
            Default: 'none',
            Main_Property: false
        },
        {
            Option: 'Asset Autocomplete',
            Name: 'asset_autocomplete',
            Type: 'String',
            Applies_To: [],
            Description: 'URL to query when typing characters in reference capture textbox. = {SEARCH} will be replaced with the characters.',
            Default: '',
            Main_Property: true
        },
        {
            Option: 'Asset Data',
            Name: 'asset_data',
            Type: 'String',
            Applies_To: [],
            Description: 'URL to query for asset data given the= {ID} returned by the asset autocomplete call.',
            Default: '',
            Main_Property: true
        },
        {
            Option: 'Reference Number Locking',
            Name: 'ref_num_lock',
            Type: 'String',
            Applies_To: [],
            Description: 'Allows control over the ability to create new units via the Record360 mobile app. This allows managers to maintain accurate and consistent data about their inventory.',
            Default: 'open',
            Main_Property: true
        }
    ]
}

export const notationsAttributes = {
    templates: [
        {
            Option: 'Notations Title',
            Name: 'title',
            Type: 'String',
            Applies_To: [],
            Description: 'List of all notations keywords will be available for tagging photos',
            Default: [],
            Main_Property: false
        },
        {
            Option: 'Notations Rank',
            Name: 'rank',
            Type: 'Integer',
            Applies_To: [],
            Description: 'List of all notations keywords will be available for tagging photos',
            Default: undefined,
            Main_Property: false
        },
        {
            Option: 'Allow Multiselect',
            Name: 'allowmultiselect',
            Type: 'Boolean',
            Applies_To: [],
            Description: 'Allows more than one notation tag on a single photo',
            Default: false,
            Main_Property: false
        }
    ]
}

export const tabAttributes = {
    Media: {
        templates: [
            {
                Option: 'Force Resolution',
                Name: 'forced_resolution',
                Type: 'String',
                Applies_To: [
                    { type: 'Media' }
                ],
                Description: '"Forced all users in a location to a certain resolution, must be one of the following: “medium”, “high”, “very_high”<br><br>NOTE** - Although forcing ""medium"" resolution can increase upload speed, it can cause the customer to not be able to zoom in or out on photos when viewing them from the dashboard. However, ""High"" resolution lets them. Screen size of the device may also affect the zooming in/out of photos from the dashboard."',
                Default: '',
                Main_Property: true
            },
            {
                Option: 'Force Native Mode',
                Name: 'forced_native_mode',
                Type: 'Boolean',
                Applies_To: [
                    { type: 'Media' }
                ],
                Description: 'Force users in a location to use native mode by default',
                Default: false,
                Main_Property: true
            },
            {
                Option: 'Hide Photo Button',
                Name: 'hide_photo_button',
                Type: 'Boolean',
                Applies_To: [
                    { type: 'Media' }
                ],
                Description: 'Hides photo button from media capture screens',
                Default: false,
                Main_Property: false
            },
            {
                Option: 'Hide Video Button',
                Name: 'hide_video_button',
                Type: 'Boolean',
                Applies_To: [
                    { type: 'Media' }
                ],
                Description: 'Hides video button from media capture screens',
                Default: false,
                Main_Property: false
            },
            {
                Option: 'Photo Button Primary',
                Name: 'photo_button_primary',
                Type: 'Boolean',
                Applies_To: [
                    { type: 'Media' }
                ],
                Description: '"Switches the position of photo and video buttons. Photo button becomes the bigger center button."',
                Default: false,
                Main_Property: true
            }
            /*{
                Option: 'Instructions',
                Name: 'instructions',
                Type: 'Array',
                Applies_To: [
                   { type: 'Media' }
                ],
                Description: 'Instructions we want to show to the user while they are capturing media',
                Default: [],
                Main_Property: false
            },
           {
                Option: 'New Instructions',
                Name: 'new_instructions',
                Type: 'Array',
                Applies_To: [
                   { type: 'Media' }
                ],
                Description: 'Instruction shown only during new/checkout transactions',
                Default: [],
                Main_Property: false
            },
           {
                Option: 'Update Instructions',
                Name: 'update_instructions',
                Type: 'Array',
                Applies_To: [
                   { type: 'Media' }
                ],
                Description: 'Instructions shown only during update transactions',
                Default: [],
                Main_Property: false
            },
           {
                Option: 'Close Instructions',
                Name: 'close_instructions',
                Type: 'Array',
                Applies_To: [
                   { type: 'Media' }
                ],
                Description: 'Instruction shown only during return/check-in transactions',
                Default: [],
                Main_Property: false
            }*/
        ]
    },

    mediaInstructionAttributes: {
        templates: [
            {
                Option: 'Auto Advance',
                Name: 'auto_advance',
                Type: 'Boolean',
                Applies_To: [
                    { type: 'Media' }
                ],
                Description: 'Will move to next instruction once an image has been captured',
                Default: false,
                Main_Property: false
            },
            {
                Option: 'Auto Navigate',
                Name: 'autonav',
                Type: 'Boolean',
                Applies_To: [
                    { type: 'Media' }
                ],
                Description: 'Will move to next instruction when instruction checkbox is checked',
                Default: false,
                Main_Property: false
            },
            {
                Option: 'Label',
                Name: 'label',
                Type: 'String',
                Applies_To: [
                    { type: 'Media' }
                ],
                Description: 'Text that will be displayed in instruction to user.',
                Default: '',
                Main_Property: false
            },
            {
                Option: 'Image URL',
                Name: 'image_url',
                Type: 'String',
                Applies_To: [
                    { type: 'Media' }
                ],
                Description: '"Can use our car images by using the following values for image_url: <br>“car_left_front.png”<br>“car_left_rear.png”<br>“car_rear.png”<br>“car_front.png”<br>“car_right_front.png”<br>“car_right_rear.png”<br><br><br>Custom urls are also supported"',
                Default: '',
                Main_Property: false
            },
            {
                Option: 'Text Color',
                Name: 'text_color',
                Type: 'String',
                Applies_To: [
                    { type: 'Media' }
                ],
                Description: 'Hex code for text color that will be applied to instruction text',
                Default: '',
                Main_Property: false
            },
            {
                Option: 'Text Size',
                Name: 'text_size',
                Type: 'Integer',
                Applies_To: [
                    { type: 'Media' }
                ],
                Description: 'Font size that will applied to instruction tex',
                Default: '',
                Main_Property: false
            }
        ]
    },

    PDF: {
        templates: [
            {
                Option: 'Form Template ID',
                Name: 'form_template_id',
                Type: 'String',
                Applies_To: [
                    { type: 'PDF' }
                ],
                Description: '',
                Default: undefined,
                Main_Property: true
            }
        ]
    },

    Share: {
        templates: [
            {
                Option: 'Send To Remember',
                Name: 'send_to_remember',
                Type: 'Boolean',
                Applies_To: [
                    { type: 'Share' }
                ],
                Description: 'If true will populate default emails into check-in (return)',
                Default: true,
                Main_Property: false
            },
            {
                Option: 'Send Emails Automatically (BCC)',
                Name: 'include_bcc',
                Type: 'String',
                Applies_To: [
                    { type: 'Share' }
                ],
                Description: 'String of comma separated emails that will be blind copied on all transactions.',
                Default: undefined,
                Main_Property: true
            },
            {
                Option: 'Copy Recipients To ...',
                Name: 'addresses_copied_to',
                Type: 'String',
                Applies_To: [
                    { type: 'Share' }
                ],
                Description: '',
                Default: 'both',
                Main_Property: false
            },
            {
                Option: 'Visible',
                Name: 'visible',
                Type: 'Boolean',
                Applies_To: [
                    { type: 'Share' }
                ],
                Description: 'Should show email entry in upload tab of Mobile apps',
                Default: true,
                Main_Property: false
            },
            {
                Option: 'Add Emails Automatically',
                Name: 'send_to_text_default',
                Type: 'String',
                Applies_To: [
                    { type: 'Share' }
                ],
                Description: 'String of comma separated emails that will be added by default on checkout',
                Default: undefined,
                Main_Property: true
            },
            {
                Option: 'Email Template',
                Name: 'template',
                Type: 'String',
                Applies_To: [
                    { type: 'Share' }
                ],
                Description: 'Choose which email template you\'d like to use',
                Default: undefined,
                Main_Property: true
            }
        ]
    },

    Upload: {
        templates: [
            {
                Option: 'Signature Logo URL',
                Name: 'signature_logo_url',
                Type: 'String',
                Applies_To: [
                    { type: 'Upload' }
                ],
                Description: 'URL to image resource that will be displayed at the top of the signature capture page',
                Default: '',
                Main_Property: false
            },
            {
                Option: 'Require Signature',
                Name: 'signature_required',
                Type: 'Boolean',
                Applies_To: [
                    { type: 'Upload' }
                ],
                Description: 'Requires user to add signature before allowing upload.',
                Default: false,
                Main_Property: true
            },
            {
                Option: 'Multiple Signatures',
                Name: 'allow_multiple_signatures',
                Type: 'Boolean',
                Applies_To: [
                    { type: 'Upload' }
                ],
                Description: 'If true allows users to enter more than one signature',
                Default: false,
                Main_Property: true
            },
            {
                Option: 'Require # Signatures',
                Name: 'required_signature_count',
                Type: 'Integer',
                Applies_To: [
                    { type: 'Upload' }
                ],
                Description: 'Amount of required signatures before allowing upload',
                Default: 0,
                Main_Property: true
            },
            {
                Option: 'Require # Photos',
                Name: 'required_photo_count',
                Type: 'Integer',
                Applies_To: [
                    { type: 'Upload' }
                ],
                Description: 'Amount of required photos needed before allowing upload',
                Default: 0,
                Main_Property: true
            },
            {
                Option: 'Require # Videos',
                Name: 'required_video_count',
                Type: 'Integer',
                Applies_To: [
                    { type: 'Upload' }
                ],
                Description: 'Amount of required videos needed before allowing upload',
                Default: 0,
                Main_Property: true
            },
            {
                Option: 'Group Item Key Notations Name',
                Name: 'name',
                Type: 'String',
                Applies_To: [
                    { type: 'Upload' }
                ],
                Description: 'Used to add custom hint to signature name field',
                Default: 'SignatureName',
                Main_Property: false
            },
            {
                Option: 'Group Item Key Notations Label',
                Name: 'label',
                Type: 'String',
                Applies_To: [
                    { type: 'Upload' }
                ],
                Description: 'Used to add custom hint to signature name field',
                Default: "Signed By",
                Main_Property: false
            },
            {
                Option: 'Check-in Label',
                Name: 'check_in_label',
                Type: 'String',
                Applies_To: [
                    { type: 'Upload' }
                ],
                Description: '',
                Default: undefined,
                Main_Property: false
            },
            {
                Option: 'Email Autocomplete',
                Name: 'email_autocomplete',
                Type: 'String',
                Applies_To: [
                    { type: 'Upload' }
                ],
                Description: 'URL provided by customer that returns email autocomplete based on search string ',
                Default: undefined,
                Main_Property: false
            },
            {
                Option: 'Agreement URL',
                Name: 'agreement_url',
                Type: 'String',
                Applies_To: [
                    { type: 'Upload' }
                ],
                Description: '',
                Default: undefined,
                Main_Property: false
            },
            {
                Option: 'Show CDW',
                Name: 'show_cdw',
                Type: 'Boolean',
                Applies_To: [
                    { type: 'Upload' }
                ],
                Description: 'If true will show cdw options in apps',
                Default: false,
                Main_Property: false
            },
            {
                Option: 'CDW Accept Prompt',
                Name: 'accept_text',
                Type: 'String',
                Applies_To: [
                    { type: 'Upload' }
                ],
                Description: 'Allows for customizing CDW text. Accept_text and decline_text will be what is shown when user has not selected an option. Result_accept_text and result_decline_text is the text that will be shown when a button is selected',
                Default: "Accept Collision DW",
                Main_Property: false
            },
            {
                Option: 'CDW Decline Prompt',
                Name: 'decline_text',
                Type: 'String',
                Applies_To: [
                    { type: 'Upload' }
                ],
                Description: 'Allows for customizing CDW text. Accept_text and decline_text will be what is shown when user has not selected an option. Result_accept_text and result_decline_text is the text that will be shown when a button is selected',
                Default: "Decline Collision Damage Waiver",
                Main_Property: false
            },
            {
                Option: 'CDW Accept Result',
                Name: 'result_accept_text',
                Type: 'String',
                Applies_To: [
                    { type: 'Upload' }
                ],
                Description: 'Allows for customizing CDW text. Accept_text and decline_text will be what is shown when user has not selected an option. Result_accept_text and result_decline_text is the text that will be shown when a button is selected',
                Default: "Accepted (text)",
                Main_Property: false
            },
            {
                Option: 'CDW Decline Result',
                Name: 'result_decline_text',
                Type: 'String',
                Applies_To: [
                    { type: 'Upload' }
                ],
                Description: 'Allows for customizing CDW text. Accept_text and decline_text will be what is shown when user has not selected an option. Result_accept_text and result_decline_text is the text that will be shown when a button is selected',
                Default: "Declined (customizable)",
                Main_Property: false
            }
        ]
    },

    Checklist: {
        templates: [
            {
                Option: 'Transaction Type',
                Name: 'transaction_type',
                Type: 'String',
                Applies_To: [
                    { type: 'Checklist' }
                ],
                Description: 'Sets which transaction type(s) this specific checklist can appear in during the transaction lifetime.',
                Default: "",
                Main_Property: false
            }
        ]
    }
}