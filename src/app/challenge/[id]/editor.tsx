"use client"
import { Editor } from "@monaco-editor/react";
import clsx from "clsx";
import * as React from "react";
import { debounce } from "~/lib/utils";
import { api } from "~/trpc/react";





type CustomEditorProps = {
    code?: string;
};

const CustomEditor = ({code}: CustomEditorProps) => {
    const codeMutation = api.challenges.saveSubmission.useMutation();
    const handleEditorChange = async (val: string) => {
        codeMutation.mutate({code: val, challengeId: 1});
    }
    const [debouncedHandleEditorChange] = debounce((val) => handleEditorChange(val as string) , 1000);
    return (
        <Editor height={"100%"}
            defaultLanguage="javascript" 
            defaultValue={code ?? 'console.log("hello world");' }
            onChange={debouncedHandleEditorChange}
            className={clsx()}
            />
    )
};

CustomEditor.displayName = "CustomEditor";

export { CustomEditor };

