import React, {useEffect, useRef, useState} from "react";
import {Alert, Card, Divider, Form, Input, Row} from "antd";
import {useAleoWASM} from "../../aleo-wasm-hook";
import {stringToUint8Array} from "../../utils/Utils";

export const VerifyMessage = () => {
    const [inputAddress, setInputAddress] = useState(null);
    const [verified, setVerified] = useState(false);
    const [signatureInput, setSignatureInput] = useState(null);
    const [messageInput, setMessageInput] = useState(null);
    const didMount = useRef(false);
    const aleo = useAleoWASM();

    const attemptVerify = () => {
        if (messageInput !== null && signatureInput !== null && inputAddress !== null) {
            try {
                let messageBytes = stringToUint8Array(messageInput);
                let signature = aleo.Signature.from_string(signatureInput);
                let isVerified = inputAddress.verify(messageBytes, signature);
                setVerified(isVerified);
            } catch (error) {
                console.warn(error);
                setVerified(false);
            }
        }
    }
    const onAddressChange = (event) => {
        try {
            setInputAddress(aleo.Address.from_string(event.target.value));
        } catch (error) {
            setInputAddress(null);
            console.warn(error);
        }
    }
    const onMessageChange = (event) => {
        setMessageInput(event.target.value);
    }
    const onSignatureChange = (event) => {
        setSignatureInput(event.target.value);
    }

    const layout = {labelCol: {span: 3}, wrapperCol: {span: 21}};
    useEffect(() => {
        if ( !didMount.current ) {
            return didMount.current = true;
        }
        attemptVerify()
    }, [messageInput, signatureInput, inputAddress, verified]);
    if (aleo !== null) {
        return <Card title="Verify Message from Address" style={{width: "100%", borderRadius: "20px"}}
                     bordered={false}>
            <Form {...layout}>
                <Form.Item label="Address" colon={false}>
                    <Input name="address" size="large" placeholder="Address" allowClear onChange={onAddressChange}
                           style={{borderRadius: '20px'}}/>
                </Form.Item>
            </Form>
            {
                (inputAddress) ?
                    <Form {...layout}>
                        <Divider/>
                        <Form.Item label="Message" colon={false}>
                            <Input name="Message" size="large" placeholder="Message"
                                   style={{borderRadius: '20px'}} onChange={onMessageChange} />
                        </Form.Item>
                        <Form.Item label="Signature" colon={false}>
                            <Input name="Signature" size="large" placeholder="Signature"
                                   style={{borderRadius: '20px'}} onChange={onSignatureChange}/>
                        </Form.Item>
                    </Form> :
                    null
            }
            {
                (inputAddress && messageInput && signatureInput) ?
                    (verified) ?
                        <Row justify="center">
                            <Alert message="Message Verified!" description="Message Was Signed By the Specified Address"
                                   type="success" showIcon closable={true} />
                        </Row>
                        :                     <Row justify="center">
                            <Alert message="Message Unverified" description="Message Was Not Signed By the Specified Address"
                                   type="warning" showIcon closable={true} />
                        </Row>
                    :
                    null
            }
        </Card>
    } else {
        return <h3>
            <center>Loading...</center>
        </h3>
    }
}