import React from 'react'
import ReactQuill from 'react-quill'
// import '../../node_modules/react-quill/dist/quill.snow.css'
import 'react-quill/dist/quill.snow.css';

export default function TextEditor({blogData, setBlogData}: {
    blogData: {
        title: string;
        content: string;
        id: string;
    },
    setBlogData: React.Dispatch<React.SetStateAction<{
        title: string;
        content: string;
        id: string;
    }>>
}) {
    // const [editorValue, setEditorValue] = useState<string>('');

    const handleChange = (newValue: string) => {
        setBlogData({
            ...blogData,
            content: newValue
        })
    }

    const modules = {
        toolbar: [
        [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'color': []}, {'background': []}],
        [{'script': 'sub'}, {'script': 'super'}],
        [{'indent': '-1'}, {'indent': '+1'}],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],
        ['clean']  // Remove formatting
      ],
}

  return (
    <div>
        <ReactQuill
            theme='snow'
            value={blogData.content}
            onChange={handleChange} 
            modules={modules}
            className='text-lg text-gray-700'
        />
        {/* <div className='mt-4'>
            <strong>Preview:</strong>
            <div dangerouslySetInnerHTML={{__html: editorValue}}></div>
        </div> */}
    </div>
  )
}
