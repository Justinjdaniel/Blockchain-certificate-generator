import { useState } from 'react';
import { contractInstance } from './utils/ethers';

function App() {
  const [result, setResult] = useState(['', '', '']);

  const handleSubmitAdd = async event => {
    event.preventDefault();

    const { certificateId, name, certificateFor, date } = event.target.elements;
    const id = certificateId.value.trim(),
      _name = name.value.trim(),
      purpose = certificateFor.value.trim(),
      issuedDate = date.value;

    const txn = await contractInstance.generateCertificate(
      id,
      _name,
      purpose,
      issuedDate
    );
    console.log(JSON.stringify(txn));
    /* sample data
    {"_type":"TransactionReceipt",
    "accessList":null,
    "blockNumber":null,
    "blockHash":null,
    "chainId":null,"data":"0x7cd44c230000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000084a6f686e20446f650000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000009426f6f7473747261700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a323032332d30322d313800000000000000000000000000000000000000000000",
    "from":"0x1dDE63a7A42e643C5B822438E92619CCA92cEc63",
    "gasLimit":"39855",
    "gasPrice":"4860326577",
    "hash":"0x11aa95f52a117cc3b9d2d945558d906583382efa04f7f1d12a0c3bf23ee23711",
    "maxFeePerGas":"4860326577",
    "maxPriorityFeePerGas":"4860326556",
    "nonce":17,
    "signature":{"_type":"signature",
      "networkV":null,
      "r":"0x0144e62ffc8d1b907325b5fbee4a96acd9532dc57ea9c4722e56579b0a686023",
      "s":"0x17eebd6dd3c1d0e465905741770dfcbfc09ab5c5dc3f6a71070e87c09e153275",
      "v":27},
    "to":"0xE5c5c138340A7e8B04Eb0f2CAF069F720303B867",
    "type":2,
    "value":"0"}
     */
  };
  const handleSubmitView = async event => {
    event.preventDefault();

    const { certificateId } = event.target.elements,
      id = certificateId.value.trim();

    const txn = await contractInstance.certificateId(id);
    setResult(txn);
    /* sample data
    [1n,"John Doe","Bootstrapping ","18/01/2023"] //[0] element is bigInt
     */
  };

  return (
    <div className='App' style={{ display: 'flex', gap: '12px' }}>
      <section>
        <form
          style={{ display: 'flex', flexDirection: 'column' }}
          onSubmit={handleSubmitAdd}>
          <label htmlFor='certificate Id'>Certificate ID</label>
          <input
            type='text'
            name='certificateId'
            id='certificateId'
            inputMode='numeric'
            pattern='^[1-9][\.\d]*(,\d+)?$'
          />
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' id='name' />
          <label htmlFor='certificate for'>Certificate Purpose</label>
          <input type='text' name='certificateFor' id='for' />
          <label htmlFor='date'>date</label>
          <input type='date' name='date' id='date' />
          <br />
          <button type='submit'>Add Certificate</button>
        </form>
      </section>
      <section style={{ display: 'flex', flexDirection: 'column' }}>
        <form
          style={{ display: 'flex', flexDirection: 'column' }}
          onSubmit={handleSubmitView}>
          <label htmlFor='certificate Id'>Certificate ID</label>
          <input
            type='text'
            name='certificateId'
            id='certificateId'
            inputMode='numeric'
            pattern='^[1-9][\.\d]*(,\d+)?$'
          />
          <br />
          <button type='submit'>View Certificate</button>
        </form>
        <pre>
          Certificate Id: {Number(result[0])} <br />
          Name: {result[1]} <br />
          Purpose: {result[2]} <br />
          Issued Date: {result[3]}
        </pre>
      </section>
    </div>
  );
}

export default App;
