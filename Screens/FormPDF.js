import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  PermissionsAndroid,
  ScrollView,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import {Button, Card, TextInput, IconButton, Colors} from 'react-native-paper';
// Import HTML to PDF
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Mailer from 'react-native-mail';

//import Share from 'react-native-share';

const FormPDF = (props) => {
  const [filePath, setFilePath] = useState('');

  const {name, phone, email, Address, DOB} = props.route.params.dataOBJ;
  //const phone = props.route.params.phone; //it comes from Account_Form

  const isPermitted = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs access to Storage data',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        alert('Write permission err', err);
        return false;
      }
    } else {
      return true;
    }
  };

  const createPDF = async () => {
    if (await isPermitted()) {
      let options = {
        //Content to print
        html: `<p class="c164"><span class="c90 c88 c93">Jamnadas Virji Shares &amp; Stock Brokers Pvt Ltd</span></p>
        <p class="c161"><span class="c90 c88 c309">&nbsp; &nbsp; &nbsp; </span><span class="c147 c90 c88 c309">NON
            INDIVIDUAL CLIENT REGISTRATION FORM</span></p>
            <table style="width:100%"" border: 1px solid black">
<tbody>
<tr>
 <td> <p>Name of stock broker/trading member/clearing member: </span>
      <span>Jamnadas Virji Shares &amp; Stock Brokers Pvt Ltd.</span></p>
 </td>
</tr>
  <tr class="c242">
                <td class="c96" colspan="3" rowspan="1">
                    <p class="c205"><span class="c84">SEBI Registration No:  </span><span class="c88 c90">BSE Capital Market: Clearing no: 339 SEBI No:
                            INZ000247838</span></p>
                    <p class="c205"><span class="c90 c88"> BSE Derivatives: Clearing no: 339 SEBI No: INZ000247838</span>
                    </p>
                    <p class="c205"><span class="c90 c88"> NSE Capital Market: Clearing no: 11837 SEBI No:
                            INZ000247838</span></p>
                    <p class="c205"><span class="c90 c88"> NSE Derivatives: Clearing no: 11837 SEBI No: INZ000247838</span>
                    </p>
                    <p class="c205"><span class="c90 c88">MCX-SX: Clearing no: 42400 SEBI No: INZ000247838</span></p>
                    <p class="c205"><span class="c90 c88">CDSL DP: SEBI REG NO: IN-DP-244-2004 &nbsp;DP ID: 034200</span>
                    </p>
                </td>
            </tr>
            <tr class="c284">
                <td class="c96" colspan="3" rowspan="1">
                    <p class="c7"><span class="c19">Registered office address: </span><span class="c14">811/812, Stock
                            Exchange Towers, Dalal Street, Fort, Mumbai &ndash; 400 001.</span></p>
                </td>
            </tr>
             <tr class="c212">
                <td class="c96" colspan="3" rowspan="1">
                    <p class="c7"><span class="c19">Ph: </span><span class="c14">022 &ndash; 22722970-74 / 49737391-95
                        </span>
                        <span class="c19">Website: </span><span class="c14">jvsons.com</span></p>
                </td>
            </tr>
            <tr class="c212">
                <td class="c96" colspan="3" rowspan="1">
                    <p class="c7"><span class="c19">Correspondence office address: </span><span class="c14">811/812,
                            Stock Exchange Towers, Dalal Street, Fort, Mumbai &ndash; 400 001.</span></p>
                </td>
            </tr>
             <tr class="c284">
                <td class="c96" colspan="3" rowspan="1">
                    <p class="c7"><span class="c19">Ph: </span><span class="c14">022 &ndash; 22722970-74 / 49737391-95 </span>
                    <span class="c19">Website: </span><span class="c14">jvsons.com</span></p>
                </td>
            </tr>
            <tr class="c212">
                <td class="c96" colspan="3" rowspan="1">
                    <p class="c7"><span class="c19">Compliance officer name, phone no. &amp; email id: </span><span
                            class="c14">1. Bhavyesh Shah </span><span class="c14"><a class="c98"
                                href="bhavyesh@jvsons.com">&ndash; 9920201320 &ndash;
                                bhavyesh@jvsons.com</a></span></p>
                </td>
            </tr>
            <tr class="c284">
                <td class="c96" colspan="3" rowspan="1">
                    <p class="c66 c221"><span class="c14">2. Divyesh Shah &ndash; 9820048829 &ndash; </span><span
                            class="c1"><a class="c98" href=":divyesh@jvsons.com">divyesh@jvsons.com</a></span></p>
                </td>
            </tr>
               <tr class="c212">
                <td class="c96" colspan="3" rowspan="1">
                    <p class="c7"><span class="c19">CEO name, phone no. &amp; email id: </span><span
                            class="c14">Bhavyesh Shah &ndash; 9920201320 &ndash; </span><span class="c1"><a class="c98"
                                href=":bhavyesh@jvsons.com">bhavyesh@jvsons.com</a></span></p>
                </td>
            </tr>
                <tr class="c301">
                <td class="c96" colspan="3" rowspan="1">
                    <p class="c7"><span class="c19">For any grievance/dispute please contact stock broker </span><span
                            class="c14">Jamnadas Virji Shares &amp; Stock Brokers Pvt Ltd</span><span class="c0">.
                            at</span></p>
                    <p class="c102"><span class="c35 c88 c179"></span></p>
                    <p class="c330"><span class="c19">the above address or </span><span class="c14">&nbsp;</span><span
                            class="c1">email id</span><span class="c19">- </span><span class="c1"><a class="c98"
                                href=":jvsons@jvsons.com">jvsons@jvsons.com</a></span><span class="c14"><a
                                class="c98" href=":jvsons@jvsons.com">&nbsp;</a></span><span class="c19">and Phone
                            no. 022 22722970-74. In case not satisfied with the response, please contact the concerned
                            exchange(s) at (i) </span><span class="c1"><a class="c98"
                                href=":is@bseindia.com">is@bseindia.com</a></span><span class="c14"><a class="c98"
                                href=":is@bseindia.com">&nbsp;</a></span><span class="c0">and Phone no. 022
                            2272</span></p>
                    <p class="c253"><span class="c19">8097. (ii) </span><span class="c14"><a class="c98"
                                href=":ignse@nse.co.in">ignse</a></span><span class="c1"><a class="c98"
                                href=":ignse@nse.co.in">@nse.co.in</a></span><span class="c14"><a class="c98"
                                href=":ignse@nse.co.in">&nbsp;</a></span><span class="c19">and Phone no. 022
                            26598190. (iii) </span><span class="c14"><a class="c98"
                                href=":investorcomplaints@mcx-sx.com">investorcomplaints@mcx-sx.com
                            </a></span><span class="c19">and Phone no. 022 67318933/9000. (iv) </span><span
                            class="c14"><a class="c98"
                                href=":investorcomplaints@useindia.com">investorcomplaints@useindia.com
                            </a></span><span class="c0">and Phone no. 022 42444904/42444932.</span></p>
                </td>
            </tr>
             <tr class="c230">
                <td class="c96" colspan="3" rowspan="1">
                    <p class="c62"><span class="c14">Clearing Member details:</span></p>
                </td>
            </tr>
             <tr class="c364">
                <td class="c101" colspan="1" rowspan="1">
                    <p class="c335"><span class="c1">NSE F&amp;O</span><span class="c14">: Stock Holding Corporation of
                            India Ltd Sebi Reg No: INF231133036</span></p>
                </td>
                <td class="c73" colspan="1" rowspan="1">
                    <p class="c238 c142 c370"><span class="c0">Address:</span></p>
                </td>
                <td class="c165" colspan="1" rowspan="1">
                    <p class="c168"><span class="c14">Plot No. P-51,</span></p>
                </td>
            </tr>
             <tr class="c339">
                <td class="c216" colspan="3" rowspan="1">
                    <p class="c2"><span class="c14">TTC Industrial Area, MIDC, Mahape, Navi Mumbai &ndash; 400 701. Tel:
                            61778067/68 &nbsp;Fax No: 61778070</span></p>
                    <p class="c116 c107"><span class="c215 c35 c88"></span></p>
                    <p class="c2"><span class="c1">MCX &ndash; Currency Derivatives</span><span class="c14">: IL &amp;
                            FS Securities Services Ltd Sebi Reg No: INE261313337 </span><span class="c0">Address:
                        </span></p>
                    <p class="c2"><span class="c14">Plot No. C-22, G Block, Bandra Kurla Complex, Bandra [E], Mumbai
                            &ndash; 400 051. Tel: 43563729 / 43563731</span></p>
                </td>
            </tr>
         </tbody>  
    </table>
    <p class="c292"><span class="c14 c35">Annexure - 2</span></p>
    <table class="c10">
        <tbody>
            <tr class="c270">
                <td class="c157" colspan="1" rowspan="1">
                    <p class="c63"><span class="c90 c95 c88">PHOTOGRAPH</span></p>
                    <p class="c63 c138"><span class="c90 c95 c88">Please affix your recent passport size photograph and
                            sign across it</span></p>
                    <p class="c94"><span class="c35 c91 c88">&Chi;</span></p>
                </td>
            </tr>
        </tbody>
    </table>
    
    `,
        //File Name
        fileName: 'he6',
        //File directory
        //directory: 'download',
      };
      let file = await RNHTMLtoPDF.convert(options);
      console.log(file.filePath);
      setFilePath(file.filePath);
      //props.navigation.navigate('Sharing');

      // RNHTMLtoPDF.convert(options).then(filePath => {
      //   console.log('PDF generated', filePath);

      // Share.open({
      //   title: 'Share this!',
      //   message: 'I just wanted to show you this:',
      //   url: filePath,
      //   subject: 'I am only visible for emails :(',
      // });

      // Share.open(options)
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => {
      //     err && console.log(err);
      //   });
    }
  };

  const click_sharePdf = () => {
    // let pdfFilePath = filePath;
    Mailer.mail(
      {
        subject: 'Store secure account pdf.',
        recipients: ['hello@tradonomy.in'],
        body: 'USkill Share qrcode file.',
        isHTML: true,
        attachments: [
          {
            path: filePath, // The absolute path of the file from which to read data.
            type: 'pdf', // Mime Type: jpg, png, doc, ppt, html, pdf, csv
            // mimeType - use only if you want to use custom type
            name: 'userform', // Optional: Custom filename for attachment
          },
        ],
      },
      (error, event) => {
        if (event == 'sent') {
          Alert.alert(
            'Success',
            'Email sent success.',
            [{text: 'Ok', onPress: () => console.log('OK')}],
            {cancelable: true},
          );
        } else {
          Alert.alert(
            error,
            event,
            [
              {
                text: 'Ok',
                onPress: () => console.log('OK: Email Error Response'),
              },
            ],
            {cancelable: true},
          );
        }
      },
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={styles.titleText}>
        Make PDF in React Native from HTML Text
      </Text>
      <View style={styles.container}>
        <TouchableOpacity onPress={createPDF}>
          <View>
            <Image
              //We are showing the Image from online
              source={{
                uri:
                  'https://raw.githubusercontent.com/AboutReact/sampleresource/master/pdf.png',
              }}
              style={styles.imageStyle}
            />
            <Text style={styles.textStyle}>Create PDF</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.textStyle}>{filePath}</Text>
      </View>
      <Button
        onPress={() => click_sharePdf()}
        title="Email Me"
        color="#841584"
        accessabilityLabel="Purple Email Me Button"
      />
    </SafeAreaView>
  );
};

export default FormPDF;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    fontSize: 18,
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  imageStyle: {
    width: 150,
    height: 150,
    margin: 5,
    resizeMode: 'stretch',
  },
});
