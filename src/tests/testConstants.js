// constants needed for testing
export const fileNameForAllExamples = 'example9.csv'

export const notValidFileWrongHeader = `file,anotherThing,text,numba,hex
example5.csv,wINm,,bcaa18b7fa1e876b544e0e90e1137eb4
example5.csv,xYiGJmOGE,8122a,01eb97a35d6e3b902a873874468d3e10
`

export const validFile = `file,text,number,hex
example9.csv,wINm,444,bcaa18b7fa1e876b544e0e90e1137eb4
example9.csv,xYiGJmOGE,81220,01eb97a35d6e3b902a873874468d3e10
example9.csv,dgjXf,682582,a0ff8a57088a79f11b3f01944c004ed2
`

export const emptyFile = ''

export const emptyFileJustHeader = 'file,text,number,hex'

// not valid files
export const notValidFileNumberMistakes = `file,text,number,hex
example9.csv,wINm,,bcaa18b7fa1e876b544e0e90e1137eb4
example9.csv,xYiGJmOGE,8122a,01eb97a35d6e3b902a873874468d3e10
example9.csv,dgjXf,68.2582,a0ff8a57088a79f11b3f01944c004ed2
example9.csv,rDuoxOUaMlmV,-426,d80cf9ea2f342c2d8fdb77af9aa632c7
example9.csv,PpYRp,102,441232fa7fd27880974b92593ac45c07
example9.csv,RzFvdnSfylP,three,e2f2333787a77b9cf464c12c694f72ec
`

export const notValidSomeTexts = `file,text,number,hex
example9.csv,,1234,abc123abc123abc123abc123abc123abc1
example9.csv,textWithNumbers123,5678,def456def456def456def456def456def4
example9.csv,validText,9101,a0ff8a57088a79f11b3f01944c004ed2
`

export const notValidSomeHexadecimals = `file,text,number,hex
example9.csv,wINm,444,bcaa18b7fa1e876b544e0e90e1137zb4
example9.csv,xYiGJmOGE,81220,01eb97a35d6e3b902a873874468d3e10
example9.csv,hello,3344,1234abcd5678ef901234abcd5678ef90
example9.csv,dgjXf,682582,
example9.csv,gamma,4455,c001d00df00dbabe9876543210abcdeff
example9.csv,delta,6677,beadface1234c0ffee9876543210abc
`

export const largeStringMultipleCasesCombined = `file,text,number,hex
example9.csv,mistakeemptynumber,,c62cc903564bb3037f2aac2f185bd209
example9.csv,gammaok,6301,ec0de06105784f38fecf0b22baf4ba7b
example9.csv,deltaok,4614,9be0498d4e4f9485211fa987edf9af72
example9.csv,mistakenotvalidnumber,dsds,7330fba27f0de4c378e0daf385af8c4a
example9.csv,
hello,1781,ab72c13e3309d7d5ecf68f324b985e28
2
<><<<<<>>>><><><>
example9.csv,validtextnotvalidcuznumberhehe22121,8983,143fa89f59c94a3926a104eaf4628c40
example9.csv,world,9456,41015c4
example9.csv,testing,4320,f4ce5271ceb3b89b20007bf73277e8a4
example9.csv,beta,9615,9ce7cd92f2b65933dc7cd97ef6cac2c7
example9.csv,,,b81414f1a186ba7a8d2673ebc640a276
,sample,9987,5a0105a73c2e9f31c86be2e3ccd1395f
example9.csv,sample,6263,zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz!!!!!!!!

example9.csv,,3374,8e2c1d629d85b3cb17f5026aea8c4980
example9.csv,,9681,ee42d22ef406cd4266db61ed94632b4d
example9.csv,,4369,2c25677a55edbc5ba419c5f8679db4e4
example9.csv,,1262,6874440725a53aaeae29efadde20678f

example9.csv,sample,7373,517026570a81778d0379f33a0a0e9aea


example9.csv,,,
example9.cc0c891c8af50617015756167b1afa3f2

example9.csv,beta,9541,5cef2ce5e46fc8bc6aa80e01757f54cc
example9.csv,delta,4408,f8d69709f2f1b7706d256c66733a9d26
`
