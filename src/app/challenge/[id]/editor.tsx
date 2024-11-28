"use client"
import Monaco, { Editor } from "@monaco-editor/react";
import clsx from "clsx";
import * as React from "react";
import { debounce } from "~/lib/utils";

function handleEditorChange(value: string) {
    console.log(value);
}

const [debouncedHandleEditorChange] = debounce(handleEditorChange, 1000);

const CustomEditor = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className}, state) => (
    <Editor height={"100%"} className={clsx(className)} defaultLanguage="javascript" defaultValue='console.log("hello world");' 
    onChange={void debouncedHandleEditorChange}/>
));

CustomEditor.displayName = "CustomEditor";

export { CustomEditor };

