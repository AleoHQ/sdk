/*! For license information please see 894.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkaleo_website=self.webpackChunkaleo_website||[]).push([[894,157,849],{9157:(e,r,t)=>{function n(e,r){return new Promise((t=>{e.addEventListener("message",(function n({data:a}){null!=a&&a.type===r&&(e.removeEventListener("message",n),t(a))}))}))}let a;async function i(e,r,i){const s={type:"wasm_bindgen_worker_init",module:e,memory:r,receiver:i.receiver()};a=await Promise.all(Array.from({length:i.numThreads()},(async()=>{const e=new Worker(new URL(t.p+t.u(157),t.b),{type:void 0});return e.postMessage(s),await n(e,"wasm_bindgen_worker_ready"),e}))),i.build()}t.d(r,{Q:()=>i}),n(self,"wasm_bindgen_worker_init").then((async e=>{const r=await t.e(529).then(t.bind(t,1529));await r.default(e.module,e.memory),postMessage({type:"wasm_bindgen_worker_ready"}),r.wbg_rayon_start_worker(e.receiver)}))},849:(e,r,t)=>{t.r(r),t.d(r,{Account:()=>s,Address:()=>a.Address,AleoKeyProvider:()=>q,AleoKeyProviderParams:()=>c,AleoNetworkClient:()=>o,BlockHeightSearch:()=>g,CREDITS_PROGRAM_KEYS:()=>d,ExecutionResponse:()=>a.ExecutionResponse,KEY_STORE:()=>p,NetworkRecordProvider:()=>h,PRIVATE_TO_PUBLIC_TRANSFER:()=>k,PRIVATE_TRANSFER:()=>m,PRIVATE_TRANSFER_TYPES:()=>v,PUBLIC_TO_PRIVATE_TRANSFER:()=>z,PUBLIC_TRANSFER:()=>x,PrivateKey:()=>a.PrivateKey,PrivateKeyCiphertext:()=>a.PrivateKeyCiphertext,Program:()=>a.Program,ProgramManager:()=>f,ProgramManagerBase:()=>a.ProgramManager,ProvingKey:()=>a.ProvingKey,RecordCiphertext:()=>a.RecordCiphertext,RecordPlaintext:()=>a.RecordPlaintext,Signature:()=>a.Signature,VALID_TRANSFER_TYPES:()=>w,VerifyingKey:()=>a.VerifyingKey,ViewKey:()=>a.ViewKey,WasmTransaction:()=>a.Transaction,createAleoWorker:()=>u,initThreadPool:()=>a.initThreadPool,initializeWasm:()=>l,logAndThrow:()=>j,verifyFunctionExecution:()=>a.verifyFunctionExecution});var n=t(7231),a=t(1529),i=t(4375);class s{_privateKey;_viewKey;_address;constructor(e={}){try{this._privateKey=this.privateKeyFromParams(e)}catch(e){throw console.error("Wrong parameter",e),new Error("Wrong Parameter")}this._viewKey=a.ViewKey.from_private_key(this._privateKey),this._address=a.Address.from_private_key(this._privateKey)}static fromCiphertext(e,r){try{e="string"==typeof e?a.PrivateKeyCiphertext.fromString(e):e;const t=a.PrivateKey.fromPrivateKeyCiphertext(e,r);return new s({privateKey:t.to_string()})}catch(e){throw new Error("Wrong password or invalid ciphertext")}}privateKeyFromParams(e){return e.seed?a.PrivateKey.from_seed_unchecked(e.seed):e.privateKey?a.PrivateKey.from_string(e.privateKey):new a.PrivateKey}privateKey(){return this._privateKey}viewKey(){return this._viewKey}address(){return this._address}toString(){return this.address().to_string()}encryptAccount(e){return this._privateKey.toCiphertext(e)}decryptRecord(e){return this._viewKey.decrypt(e)}decryptRecords(e){return e.map((e=>this._viewKey.decrypt(e)))}ownsRecordCiphertext(e){if("string"!=typeof e)return e.isOwner(this._viewKey);try{return a.RecordCiphertext.fromString(e).isOwner(this._viewKey)}catch(e){return!1}}sign(e){return this._privateKey.sign(e)}verify(e,r){return this._address.verify(e,r)}}class o{host;account;constructor(e){this.host=e+"/testnet3"}setAccount(e){this.account=e}getAccount(){return this.account}setHost(e){this.host=e+"/testnet3"}async fetchData(e="/"){try{return(await n.Z.get(this.host+e)).data}catch(e){throw new Error("Error fetching data.")}}async findUnspentRecords(e,r,t,n,i,s){if(s=s||[],e<0)throw new Error("Start height must be greater than or equal to 0");const o=new Array;let c,q,h,g,f=0,y=BigInt(0);if(void 0===t){if(void 0===this.account)throw new Error("Private key must be specified in an argument to findOwnedRecords or set in the AleoNetworkClient");h=this.account._privateKey}else try{h=t instanceof a.PrivateKey?t:a.PrivateKey.from_string(t)}catch(e){throw new Error("Error parsing private key provided.")}const u=h.to_view_key();try{const e=await this.getLatestHeight();if("number"!=typeof e)throw new Error("Error fetching latest block height.");g=e}catch(e){throw new Error("Error fetching latest block height.")}if(q="number"==typeof r&&r<=g?r:g,e>q)throw new Error("Start height must be less than or equal to end height.");for(;q>e;){c=q-50,c<e&&(c=e);try{const e=await this.getBlockRange(c,q);if(q=c,!(e instanceof Error))for(let r=0;r<e.length;r++){const t=e[r].transactions;if(void 0!==t)for(let e=0;e<t.length;e++){const r=t[e];if("execute"==r.type){const e=r.transaction;if(e.execution&&void 0!==e.execution.transitions)for(let r=0;r<e.execution.transitions.length;r++){const t=e.execution.transitions[r];if("credits.aleo"===t.program&&void 0!==t.outputs)for(let e=0;e<t.outputs.length;e++){const r=t.outputs[e];if("record"===r.type)try{const e=a.RecordCiphertext.fromString(r.value);if(e.isOwner(u)){const r=e.decrypt(u),t=r.nonce();if(s.includes(t))continue;const a=r.serialNumberString(h,"credits.aleo","credits");try{await this.getTransitionId(a)}catch(e){if(!n&&(o.push(r),"number"==typeof i&&(y+=r.microcredits(),y>=BigInt(i))))return o;if(void 0!==n&&n.length>0){let e=0;if(r.microcredits()>n[e]){if(e+=1,o.push(r),"number"==typeof i&&(y+=r.microcredits(),y>=BigInt(i)))return o;if(o.length>=n.length)return o}}}}}catch(e){}}}}}}}catch(e){if(console.warn("Error fetching blocks in range: "+c.toString()+"-"+q.toString()),console.warn("Error: ",e),f+=1,f>10)return console.warn("10 failures fetching records reached. Returning records fetched so far"),o}}return o}async getBlock(e){try{return await this.fetchData("/block/"+e)}catch(e){throw new Error("Error fetching block.")}}async getBlockRange(e,r){try{return await this.fetchData("/blocks?start="+e+"&end="+r)}catch(t){throw new Error("Error fetching blocks between "+e+" and "+r+".")}}async getLatestBlock(){try{return await this.fetchData("/latest/block")}catch(e){throw new Error("Error fetching latest block.")}}async getLatestHash(){try{return await this.fetchData("/latest/hash")}catch(e){throw new Error("Error fetching latest hash.")}}async getLatestHeight(){try{return await this.fetchData("/latest/height")}catch(e){throw new Error("Error fetching latest height.")}}async getProgram(e){try{return await this.fetchData("/program/"+e)}catch(e){throw new Error("Error fetching program")}}async getProgramObject(e){try{return a.Program.fromString(e)}catch(r){try{return a.Program.fromString(await this.getProgram(e))}catch(r){throw new Error(`${e} is neither a program name or a valid program`)}}}async getProgramImports(e){try{const r={},t=(e instanceof a.Program?e:await this.getProgramObject(e)).getImports();for(let e=0;e<t.length;e++){const n=t[e];if(!r.hasOwnProperty(n)){const e=await this.getProgram(n),t=await this.getProgramImports(n);for(const e in t)r.hasOwnProperty(e)||(r[e]=t[e]);r[n]=e}}return r}catch(e){throw j("Error fetching program imports: "+e)}}async getProgramImportNames(e){try{return(e instanceof a.Program?e:await this.getProgramObject(e)).getImports()}catch(e){throw new Error("Error fetching program imports with error: "+e)}}async getProgramMappingNames(e){try{return await this.fetchData("/program/"+e+"/mappings")}catch(e){throw new Error("Error fetching program mappings - ensure the program exists on chain before trying again")}}async getProgramMappingValue(e,r,t){try{return await this.fetchData("/program/"+e+"/mapping/"+r+"/"+t)}catch(e){throw new Error("Error fetching mapping value - ensure the mapping exists and the key is correct")}}async getStateRoot(){try{return await this.fetchData("/latest/stateRoot")}catch(e){throw new Error("Error fetching Aleo state root")}}async getTransaction(e){try{return await this.fetchData("/transaction/"+e)}catch(e){throw new Error("Error fetching transaction.")}}async getTransactions(e){try{return await this.fetchData("/block/"+e.toString()+"/transactions")}catch(e){throw new Error("Error fetching transactions.")}}async getTransactionsInMempool(){try{return await this.fetchData("/memoryPool/transactions")}catch(e){throw new Error("Error fetching transactions from mempool.")}}async getTransitionId(e){try{return await this.fetchData("/find/transitionID/"+e)}catch(e){throw new Error("Error fetching transition ID.")}}async submitTransaction(e){const r=e instanceof a.Transaction?e.toString():e;try{return(await n.Z.post(this.host+"/transaction/broadcast",r,{headers:{"Content-Type":"application/json"}})).data}catch(e){const r=e;throw r.response?new Error(`Error posting transaction. Aleo network response: ${JSON.stringify(r.response.data)}`):r.request?new Error(`Error posting transaction. No response received: ${r.message}`):new Error(`Error setting up transaction request: ${r.message}`)}}}class c{proverUri;verifierUri;cacheKey;constructor(e){this.proverUri=e.proverUri,this.verifierUri=e.verifierUri,this.cacheKey=e.cacheKey}}class q{cache;cacheOption;keyUris;async fetchBytes(e="/"){try{const r=await n.Z.get(e,{responseType:"arraybuffer"});return new Uint8Array(r.data)}catch(e){throw new Error("Error fetching data."+e)}}constructor(){this.keyUris=p,this.cache=new Map,this.cacheOption=!1}useCache(e){this.cacheOption=e}clearCache(){this.cache.clear()}cacheKeys(e,r){const[t,n]=r;this.cache.set(e,[t.toBytes(),n.toBytes()])}containsKeys(e){return this.cache.has(e)}deleteKeys(e){return this.cache.delete(e)}getKeys(e){if(console.debug(`Checking if key exists in cache. KeyId: ${e}`),this.cache.has(e)){const[r,t]=this.cache.get(e);return[a.ProvingKey.fromBytes(r),a.VerifyingKey.fromBytes(t)]}return new Error("Key not found in cache.")}async functionKeys(e){if(e){let r,t,n;if("proverUrl"in e&&"string"==typeof e.proverUrl&&(r=e.proverUrl),"verifierUrl"in e&&"string"==typeof e.verifierUrl&&(t=e.verifierUrl),"cacheKey"in e&&"string"==typeof e.cacheKey&&(n=e.cacheKey),r&&t)return await this.fetchKeys(r,t,n);if(n)return this.getKeys(n)}throw Error("Invalid parameters provided, must provide either a cacheKey and/or a proverUrl and a verifierUrl")}async fetchKeys(e,r,t){try{if(this.cacheOption){t||(t=e);const n=this.cache.get(t);if(void 0!==n)return[a.ProvingKey.fromBytes(n[0]),a.VerifyingKey.fromBytes(n[1])];{console.debug("Fetching proving keys from url "+e);const n=a.ProvingKey.fromBytes(await this.fetchBytes(e));console.debug("Fetching verifying keys "+r);const i=await this.getVerifyingKey(r);return this.cache.set(t,[n.toBytes(),i.toBytes()]),[n,i]}}return[a.ProvingKey.fromBytes(await this.fetchBytes(e)),await this.getVerifyingKey(r)]}catch(t){throw new Error(`Error: ${t} fetching fee proving and verifying keys from ${e} and ${r}.`)}}async transferKeys(e){if(m.has(e))return await this.fetchKeys(d.transfer_private.prover,d.transfer_private.verifier);if(k.has(e))return await this.fetchKeys(d.transfer_private_to_public.prover,d.transfer_private_to_public.verifier);if(x.has(e))return await this.fetchKeys(d.transfer_public.prover,d.transfer_public.verifier);if(z.has(e))return await this.fetchKeys(d.transfer_public_to_private.prover,d.transfer_public_to_private.verifier);throw new Error("Invalid visibility type")}async joinKeys(){return await this.fetchKeys(d.join.prover,d.join.verifier)}async splitKeys(){return await this.fetchKeys(d.split.prover,d.split.verifier)}async feePrivateKeys(){return await this.fetchKeys(d.fee_private.prover,d.fee_private.verifier)}async feePublicKeys(){return await this.fetchKeys(d.fee_public.prover,d.fee_public.verifier)}async getVerifyingKey(e){switch(e){case d.fee_private.verifier:return a.VerifyingKey.fromString(d.fee_private.verifyingKey);case d.fee_public.verifier:return a.VerifyingKey.fromString(d.fee_public.verifyingKey);case d.inclusion.verifier:return a.VerifyingKey.fromString(d.inclusion.verifyingKey);case d.join.verifier:return a.VerifyingKey.fromString(d.join.verifyingKey);case d.split.verifier:return a.VerifyingKey.fromString(d.split.verifyingKey);case d.transfer_private.verifier:return a.VerifyingKey.fromString(d.transfer_private.verifyingKey);case d.transfer_private_to_public.verifier:return a.VerifyingKey.fromString(d.transfer_private_to_public.verifyingKey);case d.transfer_public.verifier:return a.VerifyingKey.fromString(d.transfer_public.verifyingKey);case d.transfer_public_to_private.verifier:return a.VerifyingKey.fromString(d.transfer_public_to_private.verifyingKey);default:return a.VerifyingKey.fromBytes(await this.fetchBytes(e))}}}class h{account;networkClient;constructor(e,r){this.account=e,this.networkClient=r}setAccount(e){this.account=e}async findCreditsRecords(e,r,t,n){let a=0,i=0;if(n&&("startHeight"in n&&"number"==typeof n.endHeight&&(a=n.startHeight),"endHeight"in n&&"number"==typeof n.endHeight&&(i=n.endHeight)),0==i){const e=await this.networkClient.getLatestHeight();if(e instanceof Error)throw j("Unable to get current block height from the network");i=e}if(a>=i)throw j("Start height must be less than end height");return await this.networkClient.findUnspentRecords(a,i,this.account.privateKey(),e,void 0,t)}async findCreditsRecord(e,r,t,n){const a=await this.findCreditsRecords([e],r,t,n);return!(a instanceof Error)&&a.length>0?a[0]:(console.error("Record not found with error:",a),new Error("Record not found"))}async findRecord(e,r,t){throw new Error("Method not implemented.")}async findRecords(e,r,t){throw new Error("Method not implemented.")}}class g{startHeight;endHeight;constructor(e,r){this.startHeight=e,this.endHeight=r}}class f{account;keyProvider;host;networkClient;recordProvider;executionEngine;constructor(e,r,t){e?(this.host=e,this.networkClient=new o(e)):(this.host="https://vm.aleo.org/api",this.networkClient=new o(this.host)),this.keyProvider=r||new q,this.executionEngine=new a.ProgramManager,this.recordProvider=t}setAccount(e){this.account=e}setKeyProvider(e){this.keyProvider=e}setHost(e){this.host=e,this.networkClient.setHost(e)}setRecordProvider(e){this.recordProvider=e}async deploy(e,r,t,n,i,s){try{const r=a.Program.fromString(e);let t;try{t=this.networkClient.getProgram(r.id())}catch(e){console.log(`Program ${r.id()} does not exist on the network, deploying...`)}if("string"==typeof t)throw`Program ${r.id()} already exists on the network, please rename your program`}catch(e){throw j(`Error validating program: ${e}`)}let o,c=s;if(void 0===s&&void 0!==this.account&&(c=this.account.privateKey()),void 0===c)throw"No private key provided and no private key set in the ProgramManager";try{i=t?await this.getCreditsRecord(r,[],i,n):void 0}catch(e){throw j(`Error finding fee record. Record finder response: '${e}'. Please ensure you're connected to a valid Aleo network and a record with enough balance exists.`)}try{o=t?await this.keyProvider.feePrivateKeys():await this.keyProvider.feePublicKeys()}catch(e){throw j(`Error finding fee keys. Key finder response: '${e}'. Please ensure your key provider is configured correctly.`)}const[q,h]=o;let g;try{g=await this.networkClient.getProgramImports(e)}catch(e){throw j(`Error finding program imports. Network response: '${e}'. Please ensure you're connected to a valid Aleo network and the program is deployed to the network.`)}const f=await this.executionEngine.buildDeploymentTransaction(c,e,r,i,this.host,!1,g,q,h);return await this.networkClient.submitTransaction(f)}async execute(e,r,t,n,a,i,s,o,c,q,h){let g;try{g=await this.networkClient.getProgram(e)}catch(r){throw j(`Error finding ${e}. Network response: '${r}'. Please ensure you're connected to a valid Aleo network the program is deployed to the network.`)}let f,y=h;if(void 0===h&&void 0!==this.account&&(y=this.account.privateKey()),void 0===y)throw"No private key provided and no private key set in the ProgramManager";try{o=n?await this.getCreditsRecord(t,[],o,i):void 0}catch(e){throw j(`Error finding fee record. Record finder response: '${e}'. Please ensure you're connected to a valid Aleo network and a record with enough balance exists.`)}try{f=n?await this.keyProvider.feePrivateKeys():await this.keyProvider.feePublicKeys()}catch(e){throw j(`Error finding fee keys. Key finder response: '${e}'. Please ensure your key provider is configured correctly.`)}const[u,l]=f;if(!c||!q)try{[c,q]=await this.keyProvider.functionKeys(s)}catch(e){console.log(`Function keys not found. Key finder response: '${e}'. The function keys will be synthesized`)}let p;try{p=await this.networkClient.getProgramImports(e)}catch(e){throw j(`Error finding program imports. Network response: '${e}'. Please ensure you're connected to a valid Aleo network and the program is deployed to the network.`)}const d=await this.executionEngine.buildExecutionTransaction(y,g,r,a,t,o,this.host,!1,p,c,q,u,l);return await this.networkClient.submitTransaction(d)}async executeOffline(e,r,t,n,a,i,s,o,c){let q=c;if(void 0===c&&void 0!==this.account&&(q=this.account.privateKey()),void 0===q)throw"No private key provided and no private key set in the ProgramManager";if(!s||!o)try{[s,o]=await this.keyProvider.functionKeys(i)}catch(e){console.log(`Function keys not found. Key finder response: '${e}'. The function keys will be synthesized`)}return console.log("Running program offline"),console.log("Proving key: ",s),console.log("Verifying key: ",o),this.executionEngine.executeFunctionOffline(q,e,r,t,n,!1,a,s,o)}async join(e,r,t,n,i,s,o){let c,q,h=o;if(void 0===o&&void 0!==this.account&&(h=this.account.privateKey()),void 0===h)throw"No private key provided and no private key set in the ProgramManager";try{c=n?await this.keyProvider.feePrivateKeys():await this.keyProvider.feePublicKeys(),q=await this.keyProvider.joinKeys()}catch(e){throw j(`Error finding fee keys. Key finder response: '${e}'. Please ensure your key provider is configured correctly.`)}const[g,f]=c,[y,u]=q;try{s=n?await this.getCreditsRecord(t,[],s,i):void 0}catch(e){throw j(`Error finding fee record. Record finder response: '${e}'. Please ensure you're connected to a valid Aleo network and a record with enough balance exists.`)}try{e=e instanceof a.RecordPlaintext?e:a.RecordPlaintext.fromString(e),r=r instanceof a.RecordPlaintext?r:a.RecordPlaintext.fromString(r)}catch(e){throw j("Records provided are not valid. Please ensure they are valid plaintext records.")}const l=await this.executionEngine.buildJoinTransaction(h,e,r,t,s,this.host,!1,y,u,g,f);return await this.networkClient.submitTransaction(l)}async split(e,r,t){let n,i=t;if(void 0===i&&void 0!==this.account&&(i=this.account.privateKey()),void 0===i)throw"No private key provided and no private key set in the ProgramManager";try{n=await this.keyProvider.splitKeys()}catch(e){throw j(`Error finding fee keys. Key finder response: '${e}'. Please ensure your key provider is configured correctly.`)}const[s,o]=n;try{r=r instanceof a.RecordPlaintext?r:a.RecordPlaintext.fromString(r)}catch(e){throw j("Record provided is not valid. Please ensure it is a valid plaintext record.")}const c=await this.executionEngine.buildSplitTransaction(i,e,r,this.host,!1,s,o);return await this.networkClient.submitTransaction(c)}async transfer(e,r,t,n,a,i,s,o,c){t=function(e){return w.has(e)?e:j(`Invalid transfer type '${e}'. Valid transfer types are 'private', 'privateToPublic', 'public', and 'publicToPrivate'.`)}(t);let q,h,g=c;if(void 0===g&&void 0!==this.account&&(g=this.account.privateKey()),void 0===g)throw"No private key provided and no private key set in the ProgramManager";try{q=a?await this.keyProvider.feePrivateKeys():await this.keyProvider.feePublicKeys(),h=await this.keyProvider.transferKeys(t)}catch(e){throw j(`Error finding fee keys. Key finder response: '${e}'. Please ensure your key provider is configured correctly.`)}const[f,y]=q,[u,l]=h;try{const e=[];!function(e){return v.has(e)}(t)?s=void 0:(s=await this.getCreditsRecord(n,[],s,i),e.push(s.nonce())),o=a?await this.getCreditsRecord(n,e,o,i):void 0}catch(e){throw j(`Error finding fee record. Record finder response: '${e}'. Please ensure you're connected to a valid Aleo network and a record with enough balance exists.`)}const p=await this.executionEngine.buildTransferTransaction(g,e,r,t,s,n,o,this.host,!1,u,l,f,y);return await this.networkClient.submitTransaction(p)}createProgramFromSource(e){return a.Program.fromString(e)}creditsProgram(){return a.Program.getCreditsProgram()}verifyProgram(e){try{return a.Program.fromString(e),!0}catch(e){return!1}}async getCreditsRecord(e,r,t,n){try{return t instanceof a.RecordPlaintext?t:a.RecordPlaintext.fromString(t)}catch(t){try{const t=this.recordProvider;return await t.findCreditsRecord(e,!0,r,n)}catch(e){throw j(`Error finding fee record. Record finder response: '${e}'. Please ensure you're connected to a valid Aleo network and a record with enough balance exists.`)}}}}let y=null;const u=()=>{if(!y){const e=new Worker(new URL(t.p+t.u(718),t.b),{type:void 0});y=(0,i.Ud)(e)}return y};async function l(){return await(0,a.default)()}const p="https://testnet3.parameters.aleo.org/",d={fee_private:{prover:p+"fee_private.prover.d02301c",verifier:"fee_private.verifier.00ae6a3",verifyingKey:"verifier1qygqqqqqqqqqqqp85yqqqqqqqqqy0ggqqqqqqqqqhlaqqqqqqqqqplt2qyqqqqqqqz50xqqqqqqqqqqvqqqqqqqqqqq0r58vs3glghpap9wxma98vx8znu5nx4dr6zw4ukjwnn42jg82xmxtwfs2fz4kqpuxpeh5tmzkwzgpp99qmwwazfppvw4d830cv7d2dwpy5h6r98q6dlp295wt4rcv4vkx6q90pxhrkvd8zd67tnk6xrtgq3c6q5e3v3rypfh3ajyn4e5nnr52svqdd9tvejaauj7lc0dje239fd29wr2fcr2cctaa6wcef6rsqpuzyaj2qahlxdtvwj0c66fnu8d0r076ds2l2z4emd0rzra7yh5w93w52lqe7n3985qwrk0ugyeqvqpq95m45qgesy07j96k6fezqyrzh4s2mtd3nwgqd34gdhg5esplz0428mt7efk7w0rck9jk6t5vf5qun0lutum06l9swsljnvy62qyv9h98ce473xa03u9py2kashf277n8ycze4ec9ln0d7sssvccnv7sq2w90aqrleg7sadlt9xy4ymlqqt5adkwee0g920j4qwt9ch28eqxykctu3ddanan9xwv57n6eh5wsqtkjlse7g9q83c5gaka3gsg0g63j9fl56sy9mgxzdh0ledl85a4xfmu3jnqjlfd33w87yxw00njqszg6fvxnd828hyzgul4x6d3vsctn6jxclpj7v9gjrhvwsmeas8q3r4n5vcfqaccsl2t6vvy4qrzl0qq2ae8jt8y077tnatgy386vkmdpa6h2f6gxh22q09eqptmh9x9m4y8c2t7pgg0hpdnxkj4kez3lpjq08dzp9j9dtsr4vtjxur5c0hrrkvmd3gjzsa7378559gwqunply8hh8clhljequ4tgra2s404yfesqvph2hzaf8vqmx3dd75yllnta94796jg2v4ld054g5ke5esahfwudhpcpfm6fndcmstwcz0rhhsjgq5jetw49vfsrfr0vsala3xt8jvshg46xj9vlx70gcfhanaeqyrlke5xjzc"},fee_public:{prover:p+"fee_public.prover.5515650",verifier:"fee_public.verifier.40ea40e",verifyingKey:"verifier1qygqqqqqqqqqqq9wggqqqqqqqqqtxssqqqqqqqqqxdaqqqqqqqqqpp93qqqqqqqqqrw96qqqqqqqqqqvqqqqqqqqqqqgcegdmfr5a2z7lxv5r9pym8t77stu7xmer78uzdh635u5vg2etr0chrkm2u3k3s9gj4ypk2h96uyp8y04x2x7j9e7g932uk0vx8vau03ett9atggqwxwntlq77mde6k9kt2cfgwjdzk3lcj8xusr7n4cszr2t49ghw8s3yetemp9uq2gv4jwe7d36k96rz8thx05jye0zp2r5u04c6luzys5w39klgdhgg8knsq89h2r6u8tx7h7y2j5422q7dvjj90sn0vgfakgtfh3lwl0f83g90aykdfrsmjm40xed30gnmwxhlqgccvw7sac3hrxeamencv07hu8xwm2k9l34qlujzrtfcv3vdt36tv8c4t972a0gawpaampexfyh62qvjzjmqukzg485klj79rj4tryefz9xa37z74t93590859qqscqc5jjmqjd6uwkdnlpu60tuz4ucnypmz4cem0z2urgkue2q80z7u5fwtpzku4x6yf8vlx8nvtnlpvq7ymh2pkjaaay08557t39qnaw7zggqz4gug53aq7s3rnedfg8d3mkehqfgyvrgj0xag48jnjclp33yhejanx7zcd2ukwjmc75gm4uv022qxrm5h8uyvszmlhq2863vh3c7rl6pplvrqlasngafpnfgvhn4k427k38xqjru4q4x3jcyantaw0neqp54mucvkcdcrryed7ukqlrzx63ryv6hsp63ax4gxlaw0xrw4hfgar2wdeckghzkmza24vc3jt5juqgwwag6rh9x2j8xwujagev89g25605fqye6ld5yjaannpnzmzxtw35w5aglrtmpwwf9zjaw9049ssqlxqmwfqa9t4h7e78k87gsynjhwhuj8y0fmsndmld7ke7tzq3kfsjujxry8g7az0jmrm83qxmgrqsqz8r75cj3rxdx5v9g5n8y2sv5jv2escy2q5qs3k8s6payfkzhv52shuydc"},inclusion:{prover:p+"inclusion.prover.b46b287",verifier:"inclusion.verifier.2fae105",verifyingKey:"verifier1qyyqqqqqqqqqqqzq7qqsqqqqqqqqdugpqqqqqqqqtm7syqqqqqqqpg43qvqqqqqqqzk8sqcqqqqqqqqvqqqqqqqqqqqyjtgkq7td45a5h94srp9yljcvwacqas7empws2j9lklccezgsxp58zta506lkyu6qyk0g8h4eq2ypps3rzg4kjpz7zzutgfd0qj8jw2rnfy68h5asc65tgv89e25fn02kfx002npkuyjdqj8p0urycchcqwy4j85agcdtw7f7ua2tvtq00tk4wc8cc7yqyqwesrt5n6krf0p5penhaj4gfzpefvcnqqf3hlu7qx25n4ng8txtuhyem8lwydlq3qgm8eywzj6uy76943ja58tx3acpcjw0p9c82lxv9ralqrq5z78slqx2v796nzcjmuacrar2yp4remga7qtgm0qcvejgulhp93jamuxvxj20s4ar493pp9hyww5g0prwf7qztkjzpp4nfljdwhra2022z0rnt8mkuryl8rzz8sxxsnf6twzr6pfemlu7z0jclrad92jeswwkul5pmyrwp9e4q5xsgappatw9neup7n0u3lls9cyhlujradvyze6yywdcccchu5p864ad9ahxws3pt36cq8lk49pl3kwkszr8fc3en8u6p9tst9zf6a0hwwcuc8lzx7sh4zhqjyt4umdjl9rr2yg8z875xhqdszxxdnd5nrrv724seqrqs8u3grw85hc2qafl4glrt9s9r49a9zrp8v2akql3l7f00v0wk82el5te5qdtdf2n4a8lgzzth7fyvtxxqse6pye5je2p67l9mnv784ay5t7c4z9u59q5m75r3j7nck9a4e2pyqququmk0pa64xfcyt5kj94730awdad7ch6f22lrr4vv7l0xxsmndhzjnxttk6gw59gt3950xc5gqzsqc5zsj56c0fqpsg8aevq7cl4tj7gj8exmtlq5savkclan8kqr4554m99c8wzwf4u9r4xapktcqttcq33r2dg48kk374rzx9m98prt637cvv0j9mru779cwxytgzndutlx3napjj"},join:{prover:p+"join.prover.30895cc",verifier:"join.verifier.5cb1e62",verifyingKey:"verifier1qygqqqqqqqqqqqqqeuqqqqqqqqqz3ncqqqqqqqqqgvkqzqqqqqqqq590qyqqqqqqqzwn5qgqqqqqqqqvqqqqqqqqqqqpkgztrguz0x8mpfjhsnmqqsnwl764jw73ll0nxcg7pzt59lpd7zsjlmrprw3w6r7npmx4ck4kz3qq7mslfg4rhc9anmgza3dvms2qjhz0hatprzdgmsk3usxkttpep7wej007nzrhzzdmcca2603z4f4cp80q7drqtqw3quvqu5z4nnzspqca272csmxknz9mlwu4u6f9u2zha5rwjgv2hp0l8dlc7aa32dggq9afa5hkqmwnptqmhavy050nf48ndcl6vmjlm95c582wqyws2z5fckxsw6stcxdxxhj7v26padsumqpk58n2f6fejx3k80j2shqa642hulj3sx08ywtxg506n8dnm6nu2ltp4z5apf6wtam9kzaadackjjq6vnahqmqlkuncyslzeml246ajhy5yldyc20p9pf84gn6zdwlq79azygr4fwtvra632w333kh2e3sq4hwtk967gz8zxtsgph0nlncfhqz6wmt5cccd64qwpezp2yuglkrp7jmk4ggkefa5aw09lvhe646gpt0lkjn984uqg6r46a8q3u9vcezmtnq090xkgq0euqtkjrgjks6cxqz9hqw339k8jzepd9nxlhu7sqtv0n0uvz8p3e8wxc784jsvpf4dp92kndr2e6n9p85q8ty4z93l0fn4k7wv6neqkj9y6drya0284qv98y4lthmredwtdlm7p2489etmf473zehyhgpgmu094h97dcyzj22uzwvvayxfjlrv4qlnag2zgcqlma4j7cte6uhsfc98kf54jneuqktsmsacz7gftk9s0cunkevaamkcrt0e086j9lf9vd8eqvkn6esqfsfpjxk4lq94a5mqxgg0eazejt2wtda86l7hj2zxn9k5cy65jp6e97yp8ahakzf6vm0z53te7x9srqeupscxgx8vxla4rqse8srw9ypv3h4q902szlneeuuh4rm46rjnltvt9k"},split:{prover:p+"split.prover.a9784b9",verifier:"split.verifier.38392d9",verifyingKey:"verifier1qygqqqqqqqqqqq8qecqqqqqqqqqqnncqqqqqqqqqr4qqzqqqqqqqpnx4qyqqqqqqqqln7qgqqqqqqqqvqqqqqqqqqqqx4tv4dx9ct4hgwe0cgmqrljgeg88zfepv9gk26d4m2tggqwrj30tgpfatc9654hdggyvymxedz6qqqx3upvdhtl2ux9cvyl3qwtsj5hnqwjpq4xvdvwxggnureuqmhsyegt3k7m3nffxj9zuvkmccmfnczu5y8rd735uwlwa84qq7e092nnsrdyryap6tusdedfwsnkqfllv34l6ny0mlqdrv33jeghluhp5zs88fuc3209j958zh5fuhln6rdleyuk20c7lk4uv79ngx2uh44ed2elvf8ltcj033gg0skmrc5g9tcqrcax5nzyxpafv326m7c8lnz98gks6wlgnyk8qk7qzc4ufp236yuzx94ug8kfsj0tjnvqx6n5ls4yq27fgydj0f4ac6xhjtrqcfa675d4ufs9qdfguexv30rheew7n2n09sng7w5g5mz26dmmmsxnva0luqt2qe9h9jqmn7ajeqadqarvggquz72n94dd5dvpprppjl99lqgzavlp3nph7d4jwzp6txnhxqcecsrt0h5w95v7l8e3qtq274k8427nzl5j3ywy59ssqeagfedxpy3kaytlqmuevluk70tw50drkwaddaspdmfk7ct6s8vurtjg67atnr277xydursaj4trngkndqfhh89tmknmtukcuev77uxhsu3xv2rcr6dqw3mdy7qf6a72ltwkk5g75l4cjxc8ktxwnklcw0nwupqry4xayka9fqngyq9prc022sztk64fqr22qxcv7vtzf5dfhy3j4alqx2vnq6gzhgn8nx7trw8s09txmz6j7jm8v6fwn00evqt46ak5ykd46yfzgpmxuuxut8vxvftzfpq40sl6zhy63c5zusdstaeal9d2rcfpw9pr2pegr2cj307hapacguraxcfrgcq5q2evj9afe7cznp3c99vt44jtngr0jzfn0l6m8xl0aa3cvc75d3xge3sg"},transfer_private:{prover:p+"transfer_private.prover.deb77db",verifier:"transfer_private.verifier.3088e6d",verifyingKey:"verifier1qygqqqqqqqqqqq9n65qqqqqqqqqde4gqqqqqqqqqcfvqzqqqqqqqppl7qyqqqqqqqzuyvqgqqqqqqqqvqqqqqqqqqqqqcqaunljwmh56k2t4sa3ssex2xkw3s9sh30uyfnjq4yeg38kgfex6uferudqklkssu429k2lplcvq28f966yhpcx4jzdan698fzhpv02luxdd4dd6lfux5u5j9nvz2a4zk5yd6zegztlg0rvll27tly0gzx8nqr43yv4jnmspt6j7kcsr8fsvpux9wk9lgt4h386fjmgs2jna7r2ty5fked5kzacw8ay22wq4qp8850903z200suwyjfs3gn6wg08nl3nkvfdkn68fp45dm4hl5xejejdk3d2gxkeju354mhqna34sq2dk92eau0tw8h30plcy933zw6vskst42qkhg6tav9uqzx0f6kluee45ecamgy4sc833lzv3ke6kkq9ypf5tlsndqa2vv3xssgwyhz6awjvprrpzgs9hyehtrjp7c68ecj3h250q9mcf05cnfmrpxmdcgupzelp46jq6kvggkp97pc046fjac6m2nl2s2e63f6lxumcwvey03t2npryvnwmr486m67g4ajlx9mgpvmgv27qrf5tlq7nlpe6ekvnq53rtzwxa6spxpjppc94ntselrdw8fuyx2gevazqrx5dayls52xaszkm3xe365azkxq4n3dmps3mlmk494kxgx435wklfzneu5n8gqjtfh79gkhd7h58avjjju3j4k6edqwxnj8mf3m5qv65qkv2hllshe688x23qs9ttv2fspn93lqzutlyn9gs67rqv0zj8lz274jd43vaxzqv2yaxg9kn9fewancsdmsauw4y688ywgjqj2dekehun27qt5ew6kgl6u4uauju6trpuusk3lvjdxvp8u536pcmm7vzzgelc0cj845933ehsul7e5adr0fspgl76gfet7l5xw896705gf3qymc4j3htxwhgzavzmr0umnfqdd5gaft5r5wgax0kewjguazy0kue2277gpz0hqgvpx0a0y"},transfer_private_to_public:{prover:p+"transfer_private_to_public.prover.7ca1421",verifier:"transfer_private_to_public.verifier.37dd126",verifyingKey:"verifier1qygqqqqqqqqqqqq45vqqqqqqqqqr9gcqqqqqqqqqdqpszqqqqqqqq6tmqyqqqqqqqz302qqqqqqqqqqvqqqqqqqqqqqdr77uvehrw3k8a2ajgeecvtzhfs7e0jarvq699mgme43pz60ez57jm0drlc32arllag3s43xcgvqpezqaxl406uz8eedpe36rxferaxs5sz7w7kxvcj2xys26x24gu4jzjt2fq8s4cjkntp95qs28txjsqsz9a8vqsypzld5v0296aqdt33vzw6ngfacpvtu8tg0ppuvhpkmha7zvcv5v55ekn64sj4heqqsvqplcrkpncg8km3em4grmwp7dfveggayzdu39phkyfrqlxm96mrxzhpmca76f2995j7s787ulcm7epqtvr2wg8fhl7w8shyz5vh203zvmtt69w8hn0349tlx78g0enafs7vq7cfk9tmqpf734e4tzkp83s2qw7fqx4n2chh5ql7jy7dc9raxmzzqurnkctlq0ul38tr9mrw3hqrez6jt5tn74f20x4ya7aygp79sq4jh6gftu7wjrm6dmndm79ynr7vatxckar0tawsr7h08jvacd24pz5sl636vg8dhvedhc3q8ym3rcqjhs2dttxeqsp55kt5srx6qdt9v4ge7mqkptthzz3zjsg8ftd209w590ngn5xmpg606e0w3d8h9cszc7hj6swtk9xucm9vsz8kvcmcz2ny5mrv6wyy7nzjaq5rvsxsf4g9lmaa5dh8jvrhd78wynfaehcqvn7v93c6hqz7s8znzfcckgygetl7anv0a4g2x9tgey9qzvuy9zvjh0mcd3zcexa929cs65hvtz56qdwvfcevx2vfmcgwp5qm4xzny66z4xplm5ajr6hjvt55jnw8mcpf8unj3qk9z2w9xrtal9ndnru2upcju0yq3cyzqg7sejuqclc4wwu2wn7ceaxswmt5t4cekjrfg7zgxwng8pu0l988lk47zg44asr75szg6zn4k7sjqf393zr27t9e29plyn29r45l6j47765f0r9tw489tsgwqgu2"},transfer_public:{prover:p+"transfer_public.prover.2941ad3",verifier:"transfer_public.verifier.ed98d35",verifyingKey:"verifier1qygqqqqqqqqqqq9hggqqqqqqqqqtsssqqqqqqqqqk4aqqqqqqqqqpz9nqqqqqqqqqr596qqqqqqqqqqvqqqqqqqqqqqpf55jjwuf23j9etvgw8ewld2xx6u9as0za0w993q5374fklcucxaqmn8mdeyltg9w6x775d3mxcyqs9a0vw2mzta52usy60c9n3dht98pnek76sg2s7vnjvu3dpyhlyzaqxya3jjt0grk8jrc6z0xcajsrlsy74sgzfl5g2zpxv585aavv44e28q2fmhnw8gw4nyfg9trfn3d8d39yuze6rqnx70aqfqumdgzqqrad6kmnm6nrkww2l4xu0gt4t467m24hk60ra9lyd3jkzs6v8l57nmupn0dz6t0k77lutj68z4vqqruuqwuh72gc0xl9x8c6d0ufuffdfp63x82xe8r65a25qhx2d0n44ve6m4fln2m9ck8tslh3kqa3uqn6cg53l8x4yv44a00kpy5nprz0kmf5xm62xkkny4vua85fanzq6u9zsqg7mm3yq3p5s22m0xd54cq98um775vscxfnsf54gzryqkt253v0pynrllxr0cymt6w9l05trnlw7egg7f4ld8d5jdzxky82m6sq025a96ewr9vmdnyhve3724e6hdn60yrme4jagdtjxavxhtmm2zn86aq0v5t0zgdesu3m79euw3sqyqzm93v8etujswag742nc6zugwtccmtxxfllxx7vzqhygzvqk0ujgft2hhltetg2w5n73dhz9ufnqgdqmqe00eq08amtpxs5kl3c5hdutgq9zmfac4ke08frt0e09vrf0y6kdh3z3hq08d88gp7n8c22vqdr6sqyg3uxspk0x77rrr43q284nj62ll7dufxwq4hpx0qw2dgsayw9wzjngh0l00j9kah0mvx25yqmumjessw3k7j4g8esk6u33wk3344x0nfha9cu84lnp649jhdmq7rwxumel7xq6nx9syzs4tn7ncgqrvk83lza285cz6r3gf3j79n4c4pmtn42vsjj2t3f57ceha4kvupct6ss4"},transfer_public_to_private:{prover:p+"transfer_public_to_private.prover.67f57fc",verifier:"transfer_public_to_private.verifier.f2aaeee",verifyingKey:"verifier1qygqqqqqqqqqqqqswsqqqqqqqqqpuaqqqqqqqqqqdm9sqqqqqqqqp2pwqyqqqqqqqrp26qqqqqqqqqqvqqqqqqqqqqqdmukmllrvx44ed40um3qe2yq58lmvajsqucq2x8egmls6x8jyeusvn6pzcph4hw25nrsr5p6g60ypayclhdergx3zx4x67unesl33fxv6xkm5tzf5k3ehdf67faut52l5u4npsq0zqlh5w2tk02jaj8hcq4z6fypqg9yh83xwh6z6xcvx3vqpu08whfuvcefk30xg5z7xu3mqleshpmzu6060aucm90jjtfgrsqau7shuwwtgghzgcaxj2ruje6y5jag6jy5nrvgxuyjdawg9t29upzv5qzz2zl6gmpmlzum58du4hqqhnrfc2uvx45c8zp5xa68pqlvhzexmucsujwuvff6f9jrxpg7jtretg9er7n0qsv34jtjjrgpqqzqq50qa7vljmn20lsfu2zc3nnzntrcr5wt880ywdykya5jv23cywlc4nyvdcqsc9wxly77falzt79cq9wuls5euc7d8thyqhnuehnjztfshr5syks9zra6yrt7hk6rvnv5d9jypehqkfhz2m0avcwksaxgqpcgw72pg7edz4fdfp4tfhynzarav9yrjm09gu2wgfcde0cq5kd4uq0znmen5jeu0wmfpden3c50rqpjjdwgyjrsnffzfjnswa7dcacz8dgk7h48q0xtz442hvalaeveyxm86e9t5f437krv5tjrenzr4vqgzm8uag6azkty05y7ngfpwzkra9ytqqhfuvp5h2eush3m4y2cxu3vc77pzc7wmesdhhhtqzhxc0qqujxpatu4p56u3hh4rnzyj7pqnqrc0s2h93vsjnj7uax633d0tk266mls44rwthp7c4y9lxy5naqvqqr8cy3hj46zgjlvkk7arh7vet60gpqz68ynrawxqacrry0k7tu3u8xtkp6xeg5jeumu4g7uaw9mcr7u9qxy9tjqma4r8awswqg9k8306f3u408z3z937pmhtu9gj68qp8h0zpz"}},v=new Set(["transfer_private","private","transferPrivate","transfer_private_to_public","privateToPublic","transferPrivateToPublic"]),w=new Set(["transfer_private","private","transferPrivate","transfer_private_to_public","privateToPublic","transferPrivateToPublic","transfer_public","public","transferPublic","transfer_public_to_private","publicToPrivate","transferPublicToPrivate"]),m=new Set(["private","transfer_private","transferPrivate"]),k=new Set(["private_to_public","privateToPublic","transfer_private_to_public","transferPrivateToPublic"]),x=new Set(["public","transfer_public","transferPublic"]),z=new Set(["public_to_private","publicToPrivate","transfer_public_to_private","transferPublicToPrivate"]);function j(e){throw console.error(e),e}},4375:(e,r,t)=>{t.d(r,{Ud:()=>f});const n=Symbol("Comlink.proxy"),a=Symbol("Comlink.endpoint"),i=Symbol("Comlink.releaseProxy"),s=Symbol("Comlink.finalizer"),o=Symbol("Comlink.thrown"),c=e=>"object"==typeof e&&null!==e||"function"==typeof e,q=new Map([["proxy",{canHandle:e=>c(e)&&e[n],serialize(e){const{port1:r,port2:t}=new MessageChannel;return h(e,r),[t,[t]]},deserialize:e=>(e.start(),f(e))}],["throw",{canHandle:e=>c(e)&&o in e,serialize({value:e}){let r;return r=e instanceof Error?{isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:{isError:!1,value:e},[r,[]]},deserialize(e){if(e.isError)throw Object.assign(new Error(e.value.message),e.value);throw e.value}}]]);function h(e,r=globalThis,t=["*"]){r.addEventListener("message",(function a(i){if(!i||!i.data)return;if(!function(e,r){for(const t of e){if(r===t||"*"===t)return!0;if(t instanceof RegExp&&t.test(r))return!0}return!1}(t,i.origin))return void console.warn(`Invalid origin '${i.origin}' for comlink proxy`);const{id:c,type:q,path:f}=Object.assign({path:[]},i.data),y=(i.data.argumentList||[]).map(k);let u;try{const r=f.slice(0,-1).reduce(((e,r)=>e[r]),e),t=f.reduce(((e,r)=>e[r]),e);switch(q){case"GET":u=t;break;case"SET":r[f.slice(-1)[0]]=k(i.data.value),u=!0;break;case"APPLY":u=t.apply(r,y);break;case"CONSTRUCT":u=function(e){return Object.assign(e,{[n]:!0})}(new t(...y));break;case"ENDPOINT":{const{port1:r,port2:t}=new MessageChannel;h(e,t),u=function(e,r){return w.set(e,r),e}(r,[r])}break;case"RELEASE":u=void 0;break;default:return}}catch(e){u={value:e,[o]:0}}Promise.resolve(u).catch((e=>({value:e,[o]:0}))).then((t=>{const[n,i]=m(t);r.postMessage(Object.assign(Object.assign({},n),{id:c}),i),"RELEASE"===q&&(r.removeEventListener("message",a),g(r),s in e&&"function"==typeof e[s]&&e[s]())})).catch((e=>{const[t,n]=m({value:new TypeError("Unserializable return value"),[o]:0});r.postMessage(Object.assign(Object.assign({},t),{id:c}),n)}))})),r.start&&r.start()}function g(e){(function(e){return"MessagePort"===e.constructor.name})(e)&&e.close()}function f(e,r){return d(e,[],r)}function y(e){if(e)throw new Error("Proxy has been released and is not useable")}function u(e){return x(e,{type:"RELEASE"}).then((()=>{g(e)}))}const l=new WeakMap,p="FinalizationRegistry"in globalThis&&new FinalizationRegistry((e=>{const r=(l.get(e)||0)-1;l.set(e,r),0===r&&u(e)}));function d(e,r=[],t=function(){}){let n=!1;const s=new Proxy(t,{get(t,a){if(y(n),a===i)return()=>{!function(e){p&&p.unregister(e)}(s),u(e),n=!0};if("then"===a){if(0===r.length)return{then:()=>s};const t=x(e,{type:"GET",path:r.map((e=>e.toString()))}).then(k);return t.then.bind(t)}return d(e,[...r,a])},set(t,a,i){y(n);const[s,o]=m(i);return x(e,{type:"SET",path:[...r,a].map((e=>e.toString())),value:s},o).then(k)},apply(t,i,s){y(n);const o=r[r.length-1];if(o===a)return x(e,{type:"ENDPOINT"}).then(k);if("bind"===o)return d(e,r.slice(0,-1));const[c,q]=v(s);return x(e,{type:"APPLY",path:r.map((e=>e.toString())),argumentList:c},q).then(k)},construct(t,a){y(n);const[i,s]=v(a);return x(e,{type:"CONSTRUCT",path:r.map((e=>e.toString())),argumentList:i},s).then(k)}});return function(e,r){const t=(l.get(r)||0)+1;l.set(r,t),p&&p.register(e,r,e)}(s,e),s}function v(e){const r=e.map(m);return[r.map((e=>e[0])),(t=r.map((e=>e[1])),Array.prototype.concat.apply([],t))];var t}const w=new WeakMap;function m(e){for(const[r,t]of q)if(t.canHandle(e)){const[n,a]=t.serialize(e);return[{type:"HANDLER",name:r,value:n},a]}return[{type:"RAW",value:e},w.get(e)||[]]}function k(e){switch(e.type){case"HANDLER":return q.get(e.name).deserialize(e.value);case"RAW":return e.value}}function x(e,r,t){return new Promise((n=>{const a=new Array(4).fill(0).map((()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16))).join("-");e.addEventListener("message",(function r(t){t.data&&t.data.id&&t.data.id===a&&(e.removeEventListener("message",r),n(t.data))})),e.start&&e.start(),e.postMessage(Object.assign({id:a},r),t)}))}}}]);
//# sourceMappingURL=894.bundle.js.map