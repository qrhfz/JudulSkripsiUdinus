const rp = require('request-promise');
const $ = require('cheerio');
var fs = require('fs');

const url = 'https://dinus.ac.id/detailstaf/';
const listRIPDosen = [
    'https://web.archive.org/web/20200811092204/https://dinus.ac.id/detailstaf/0686.11.1994.058', //Bu astuti
    'https://web.archive.org/web/20200922084615/https://dinus.ac.id/detailstaf/0686.11.2009.354', //pak wij
    'https://web.archive.org/web/20201202215830/https://dinus.ac.id/detailstaf/0686.11.2006.336', //pak andik
]
const listDosen = [
    '0686.11.1996.106', // Pak Budi Raharjo
    '0686.11.2009.374', // Pak Sendi
    '0686.11.2016.671', //Pak Wahyu aji
    '0686.11.1997.132', //Bu Erna Zuni
    '0686.11.1996.097', //Pak Heru Lestiawan
    '0686.11.1994.055', //Pak Sidiq
    '0686.11.1996.100', //Pak Usman
    '0686.11.1995.067', //Pak Ahmad Wahid
    '0686.11.1996.094', //Pak Tojo
    '0686.11.1993.040', //Pak Edy MUlyanto
    '0686.11.1998.170', //Pak Daurat Sinaga
    '0686.11.1994.057', //Pak Edi Faisal
    '0686.11.2004.311', //Pak Adi Prihandono
    '0686.11.2009.361', //Slamet Sudaryanto
    '0686.11.1996.093', //Nova Rijati
    '0686.11.1997.125', //Noor Ageng
    '0686.11.1998.146', //Cahaya
    '0686.11.1998.148', //Suprayogi
    '0686.11.2013.532', //Yani P. Astuti
    '0686.11.2000.253', //AJib
    '0686.11.1998.147', //Elkaf
    '0686.11.1997.141', //Feri Agustina
    '0686.11.1998.160', //Dewi Agustini
    '0686.11.1999.186', //L. Budi
    '0686.11.2001.267', //Ifan
    '0686.11.2012.456', //Abu Salam
    '0686.11.2009.372', //Umi
    '0686.11.2015.633', //Rama Aria
    '0686.11.2011.415', //Catur
    '0686.11.2009.371', //Hanny Haryanto
    '0686.11.2012.442', //Erwin
    '0686.11.2012.460', //Ardytha
    '0686.11.2013.537', //Novita Kurnia
    '0686.11.2013.536', //Defri
    '0686.11.2011.416', //Ricardus
    '0686.11.2012.440', //Fahri F
    '0686.12.2013.561', //Imanuel H
    '0686.11.2012.444', //Adhitya N
    '0686.11.2012.458', //Eko Hari
    '0686.11.2012.407', //Christy
    '0686.11.2014.586', //Prajanto
    '0686.11.2011.398', //Fauzi Adi
    '0686.11.2012.459', //Junta
    '0686.11.2014.583', //Danang
    '0686.11.2012.446', //nisa'ul
    '0686.11.2012.404', //moses
    '0686.11.2014.571', //umam
    '0686.11.2015.616', //Cinan
    '0686.11.2014.585', //Egi
    '0686.11.2017.692', //abas
]

let listSkripsi = []

printListSkripsi()

async function getListSkripsi() {
    
    for (dosen of listDosen) {
        await rp(url + dosen)
        .then(function (html) {
            //success!
            $('div#messages>table>tbody>tr', html).each(function (i, elem) {
                listSkripsi.push(extractRow($(this)))
            })
        })
        .catch(function (err) {
            //handle error
            console.log(err)
        })
    }
    for (dosen of listRIPDosen) {
        await rp(dosen)
        .then(function (html) {
            //success!
            $('div#messages>table>tbody>tr', html).each(function (i, elem) {
                listSkripsi.push(extractRow($(this)))
            })
        })
        .catch(function (err) {
            //handle error
            console.log(err)
        })
    }
}

async function printListSkripsi() {
    await getListSkripsi(listDosen).then(() => {
        var json = JSON.stringify(listSkripsi)
    
        fs.writeFile('judulSkripsi.json', json, 'utf8', (_)=>{console.log('asik')})
    })

}


function extractRow(param) {
    let baris = param.children()
    return {
        "nim": baris.eq(0).text(),
        "judul": baris.eq(2).text(),
        "dosen": baris.eq(3).text(),
    }
}
