const uploadImage = require('../lib/uploadImage')
require('../message/config.js')

let smeme = async(M, bob, sendFile, q, setting) =>{
let [atas, bawah] = q.split`|`
let q1 = M.quoted ? M.quoted : M
let mime = (q1.msg || q1).mimetype || '' 
if (!mime)return M.reply(`balas gambar dengan perintah\n\n!smeme <${atas ? atas : 'teks atas'}>|<${bawah ? bawah : 'teks bawah'}>`)

if (!/image\/(jpe?g|png)/.test(mime))return M.reply(`_*Mime ${mime} tidak didukung!*_`)
let img = await q1.download() 
let url = await uploadImage(img) 
let meme = `https://api.memegen.link/images/custom/${encodeURIComponent(atas ? atas : '_')}/${encodeURIComponent(bawah ? bawah : '')}.png?background=${url}`
try { 
await bob.sendImageAsSticker(M.chat, meme, M, { packname: global.packname, author: global.author })
} catch (e) {
console.log(e)
M.reply('gagal membuat stiker') 
await sendFile(M.chat, meme,'Nih', M)
}
}

module.exports = smeme



