import axios from 'axios'

export const getIpfsHash = async (file, mt) => {
    let formData = new FormData();
    formData.append('file', file);
    const { data: { IpfsHash } } = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData,
        {
            maxContentLength: 'Infinity',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                'pinata_api_key': "d5d2889bcf248630d2a5",
                'pinata_secret_api_key': "31e35100905925f87f6c2a2d2b62cab51fc5e11ded89ad9bab421997d87e0177"
            }
        }
    )

    let metadata = mt
    metadata.image = `https://gateway.pinata.cloud/ipfs/${IpfsHash}`
    const { data } = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", metadata,
        {
            maxContentLength: 'Infinity',
            headers: {
                'pinata_api_key': "d5d2889bcf248630d2a5",
                'pinata_secret_api_key': "31e35100905925f87f6c2a2d2b62cab51fc5e11ded89ad9bab421997d87e0177"
            }
        }
    )
    return data.IpfsHash
}