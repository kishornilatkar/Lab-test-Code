
"use client";
import React, { useState, useEffect } from 'react';
import { FaUser, FaBuilding, FaClipboardList, FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import { API_URL } from '@/config/MainConfig';
import Link from 'next/link';

const API_CUSTOMERS = `${API_URL}/customer/getAll`;
const API_CUSTOMER_SITE = `${API_URL}/customerSite/getByCustomerId`;
const API_EXAM_ITEMS = `${API_URL}/examItem/getAll`;
const API_EXAM_ITEM_PARAM = `${API_URL}/examItemParam/getByExamItemId`;
const API_SUBMIT_INSPECTION = `${API_URL}/inspectn/create`; 

interface Customer {
    customerId: number;
    customerName: string;
    address: string;
    city: string;
    pincode: string;
}

interface CustomerSite {
    siteId: number;
    siteName: string;
}

interface ExamItem {
    customerId: number;
    customerName: string;
    address: string;
    city: string;
    pincode: string;
  }

  interface Site {
    siteId: number;
    siteName: string;
    address: string;
    city: string;
    pincode: string;
  }  
interface FormState {
    selectedCustomer: Customer | null;
    selectedSite: Site | null;
    inspectnTitle: string;
    addedItems: ExamItem[];
    // add other properties as needed
  };
  


const InspectnForm = () => {
    const [customers, setCustomers] = useState([]);
    const [customerSites, setCustomerSites] = useState<CustomerSite[]>([]);
    const [examItems, setExamItems] = useState([]);
    const [examItemParams, setExamItemParams] = useState([]); 
  //  const [selectedCustomer, setSelectedCustomer] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [selectedSite, setSelectedSite] = useState('');
    const [selectedExamItem, setSelectedExamItem] = useState('');
    const [inspectnId, setInspectnId] = useState('');
    const [inspectnTitle, setInspectnTitle] = useState('Report of Examination of Hoist Lift, Lifting Machine, Chains, Ropes, & Lifting Tackles');
    const [formNum, setFormNum] = useState('FORM 11');
    const [inspectnFormatId, setInspectnFormatId] = useState(1);
    const [formRule, setFormRule] = useState('(See Rules 62 and 64)');
    const [declaratn, setDeclaratn] = useState('I/We thoroughly examined the Hoist, Lift, Lifting Machine, Ropes, Chains and Lifting Tackles and of examinations / test carried out is enclosed herewith that the above is a correct report of the result.');
    setInspectnFormatId(1);

    const [formState, setFormState] = useState<FormState>({
        selectedCustomer: null,
        selectedSite: null,
        inspectnTitle: '',
        addedItems: [],
      });

//--
const [inspectnDate, setInspectnDate] = useState('');
setInspectnDate('');
//const [constructnDate, setConstructnDate] = useState('');
//const [takeninuseinfactoryDate, setTakeninuseinfactoryDate] = useState('');
//const [inspectnLastDate, setInspectnLastDate] = useState('');

const [inspectnLastBy, ] = useState('Not Applicable');
const [maintPartProperlyWorking, ] = useState('Not Applicable');
const [maintDefectEnclosure, ] = useState('Not Applicable');
const [maintDefectLandingGateCage, ] = useState('Not Applicable');
const [maintDefectInterlock, ] = useState('Not Applicable');
const [maintDefectOtherGateFasten, ] = useState('Not Applicable');
const [maintDefectCagePlatform, ] = useState('Not Applicable');
const [maintDefectOverRunDevice, ] = useState('Not Applicable');
const [maintDefectSuspensionRopeChain, ] = useState('Not Applicable');
const [maintDefectSafetyGear, ] = useState('Not Applicable');
const [maintDefectBrake, ] = useState('Not Applicable');
const [maintDefectWorkofspurGearing, ] = useState('Not Applicable');
const [maintDefectOtherElectricEquip, ] = useState('Not Applicable');
const [maintDefectOtherPart, ] = useState('Not Applicable');
//const [testExamDate, setTestExamDate] = useState('Not Applicable');
const [testExamNum, ] = useState('Not Applicable');
const [testExamDetail, ] = useState('Not Applicable');
const [testExamPersonName, ] = useState('Not Applicable');
//const [annealDate, setAnnealDate] = useState('Not Applicable');
const [annealTreatment, ] = useState('Not Applicable');
const [annealPersonName, ] = useState('Not Applicable');
const [particularDefectFound, ] = useState('Not Applicable');
const [repairRenewalAlteratn, ] = useState('Not Applicable');
//const [nextDueDate, setNextDueDate] = useState('Not Applicable');
const [certificateNum, ] = useState('Not Applicable');
//const [certificateValidUptoDate, setCertificateValidUptoDate] = useState('Not Applicable');
//--
    const [addedItems, setAddedItems] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch(API_CUSTOMERS);
                const data = await response.json();
                setCustomers(data);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };

        const fetchExamItems = async () => {
            try {
                const response = await fetch(API_EXAM_ITEMS);
                const data = await response.json();
                setExamItems(data);
            } catch (error) {
                console.error('Error fetching exam items:', error);
            }
        };

        fetchCustomers();
        fetchExamItems();
    }, []);

    useEffect(() => {
        if (selectedCustomer) {
            const fetchCustomerSites = async () => {
                try {
                    const response = await fetch(`${API_CUSTOMER_SITE}/${selectedCustomer}`);
                    const data = await response.json();
                    setCustomerSites(data);
                } catch (error) {
                    console.error('Error fetching customer sites:', error);
                }
            };

            fetchCustomerSites();
        } else {
            setCustomerSites([]);
        }
    }, [selectedCustomer]);

    useEffect(() => {
        const fetchExamItemParams = async () => {
            if (!selectedExamItem) {
                setExamItemParams([]);
                return;
            }
            try {
                const response = await fetch(`${API_EXAM_ITEM_PARAM}/${selectedExamItem}`);
                const data = await response.json();
                setExamItemParams(data);
            } catch (error) {
                console.error('Error fetching exam item parameters:', error);
            }
        };

        fetchExamItemParams();
    }, [selectedExamItem]);

    const validateFields = () => {

        const newErrors: any = {}; // Or specify a more specific type for newErrors
        if (!formState.selectedCustomer) newErrors.selectedCustomer = 'Customer is required';
        if (!formState.selectedSite) newErrors.selectedSite = 'Site is required';
        if (!formState.inspectnTitle) newErrors.inspectnTitle = 'Inspection title is required';
        if (formState.addedItems.length < 1) newErrors.addedItems = 'At least one exam item is required';

/*         const newErrors = {};
        if (!selectedCustomer) newErrors.selectedCustomer = 'Customer is required';
        if (!selectedSite) newErrors.selectedSite = 'Site is required';
        if (!inspectnTitle) newErrors.inspectnTitle = 'Inspection title is required';
        if (addedItems.length < 1) newErrors.addedItems = 'At least one exam item is required';
 */
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAdd = (e) => {
        e.preventDefault();
        
        // Reset exam item error on each attempt to add
        setErrors((prevErrors) => ({
            ...prevErrors,
            selectedExamItem: '',
        }));

        // Check if an exam item is selected
        if (!selectedExamItem) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                selectedExamItem: 'Exam item is required',
            }));
            return; // Exit if no exam item is selected
        }

        // Check if item has already been added
        const itemExists = addedItems.some(item => item.itemId === Number(selectedExamItem));
        if (itemExists) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                selectedExamItem: 'This exam item has already been added!',
            }));
            return;
        }

        const selectedItem = examItems.find(item => item.itemId === Number(selectedExamItem));
        if (selectedItem) {
            const newItem = {
                inspectnId,
                itemId: selectedItem.itemId,
                itemName: selectedItem.itemName,
                params: examItemParams,
            };
            setAddedItems([...addedItems, newItem]);
            setSelectedExamItem('');
            setInspectnId('');
        }
    };

    const handleRemove = (itemToRemove) => {
        setAddedItems(addedItems.filter(item => item.itemId !== itemToRemove.itemId));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields including addedItems
        if (!validateFields()) {
            return; // Exit if validation fails
        }
     //   setInspectnFormatId(1);
        const submissionData = {
            customerId: selectedCustomer,
            customerSiteId: selectedSite,
            inspectnTitle: inspectnTitle,
            inspectnFormatId: inspectnFormatId,
            formNum: formNum,
            formRule: formRule,
            declaratn: declaratn,
  
            inspectnDate: inspectnDate,
          //  constructnDate: constructnDate || null,
         //   takeninuseinfactoryDate: takeninuseinfactoryDate,
         //   inspectnLastDate: inspectnLastDate,
            inspectnLastBy: inspectnLastBy,
            maintPartProperlyWorking: maintPartProperlyWorking,
            maintDefectEnclosure: maintDefectEnclosure,
            maintDefectLandingGateCage: maintDefectLandingGateCage,
            maintDefectInterlock: maintDefectInterlock,
            maintDefectOtherGateFasten: maintDefectOtherGateFasten,
            maintDefectCagePlatform: maintDefectCagePlatform,
            maintDefectOverRunDevice: maintDefectOverRunDevice,
            maintDefectSuspensionRopeChain: maintDefectSuspensionRopeChain,
            maintDefectSafetyGear: maintDefectSafetyGear,
            maintDefectBrake: maintDefectBrake,
            maintDefectWorkofspurGearing: maintDefectWorkofspurGearing,
            maintDefectOtherElectricEquip: maintDefectOtherElectricEquip,
            maintDefectOtherPart: maintDefectOtherPart,
            testExamNum: testExamNum,
            testExamDetail: testExamDetail,
            testExamPersonName: testExamPersonName,
            annealTreatment: annealTreatment,
            annealPersonName: annealPersonName,
            particularDefectFound: particularDefectFound,            
            repairRenewalAlteratn: repairRenewalAlteratn,
            certificateNum: certificateNum,                 

            inspectnItemList: addedItems,
        };

        try {
            const response = await fetch(API_SUBMIT_INSPECTION, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData),
            });

           // const responseText = await response.text(); // Get raw response
          //  console.log('Response Text:', responseText); // Log the response
          console.log("Submission Data:", submissionData);

            if (response.ok) {
                const responseData = await response.json(); // Capture the response data
                setInspectnId(responseData.inspectnId); // Store the inspectnId
                setIsSubmitted(true);
            } else {
                const errorData = await response.json();
                console.error('Submission failed:', errorData);
                alert('Failed to submit the form. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting inspection:', error);
            alert('An error occurred while submitting the form. Please try again.');
        }
    };

    if (isSubmitted) {
        return (
            <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
                <h1 className="text-2xl font-bold mb-4">Success!</h1>
                <p className="mb-4 text-green-500 font-semibold">Inspection has been created successfully.</p>
                <p className="mb-4">Inspection ID: <strong>{inspectnId}</strong></p> {/* Display the inspectnId */}

               
                <Link href={`/intra/inspectn/inspectn1/edit/${inspectnId}`} className="flex items-center bg-green-500 text-white px-2 py-1 rounded" >                    
                   <FaEdit className="mr-2" /> Edit this Inspection
                 </Link>                
                

                <button onClick={() => window.location.reload()} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                   Create Inspection
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl_ w-auto mx-auto p-4 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-center">Create Inspection</h1>

            <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={inspectnTitle}
                    onChange={(e) => setInspectnTitle(e.target.value)}
                    required
                    readOnly 
                />
            </div>

{/*             <div className="mb-4">
                <label className="block text-gray-700">inspectnFormatId</label>
                <input
                    type="number"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={inspectnFormatId}
                 //   onChange={(e) => setInspectnFormatId(e.target.value)}
                    onChange={(e) => setInspectnFormatId(Number(e.target.value))}
                    required
                />
            </div> */}

            <div className="mb-4">
                <label className="block text-gray-700">Form Number</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={formNum}
                    onChange={(e) => setFormNum(e.target.value)}
                    required
                    readOnly 
                />
            </div>



            <div className="mb-4">
                <label className="block text-gray-700">Form Rule</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={formRule}
                    onChange={(e) => setFormRule(e.target.value)}
                    required
                    readOnly 
                />
            </div>            

            <div className="mb-4">
                <label className="block text-gray-700">Declaration</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={declaratn}
                    onChange={(e) => setDeclaratn(e.target.value)}
                    required
                    readOnly 
                />
            </div> 


<input 
  type="hidden"
  name="inspectnLastBy" 
  value={inspectnLastBy}
/>
{/* 
<input 
  type="hidden"
  name="constructnDate" 
  value={constructnDate}
/>

<input 
  type="hidden"
  name="takeninuseinfactoryDate" 
  value={takeninuseinfactoryDate}
/> */}

<input 
  type="hidden"
  name="maintPartProperlyWorking" 
  value={maintPartProperlyWorking}
  readOnly
/>
<input 
  type="hidden"
  name="maintDefectEnclosure" 
  value={maintDefectEnclosure}
  readOnly
/>
<input 
  type="hidden"
  name="maintDefectLandingGateCage" 
  value={maintDefectLandingGateCage}
  readOnly
/>
<input 
  type="hidden"
  name="maintDefectInterlock" 
  value={maintDefectInterlock}
  readOnly
/>
<input 
  type="hidden"
  name="maintDefectOtherGateFasten" 
  value={maintDefectOtherGateFasten}
  readOnly
/>
<input 
  type="hidden"
  name="maintDefectCagePlatform" 
  value={maintDefectCagePlatform}
  readOnly
/>
<input 
  type="hidden"
  name="maintDefectOverRunDevice" 
  value={maintDefectOverRunDevice}
  readOnly
/>
<input 
  type="hidden"
  name="maintDefectSuspensionRopeChain" 
  value={maintDefectSuspensionRopeChain}
  readOnly
/>
<input 
  type="hidden"
  name="maintDefectSafetyGear" 
  value={maintDefectSafetyGear}
  readOnly
/>
<input 
  type="hidden"
  name="maintDefectBrake" 
  value={maintDefectBrake}
  readOnly
/>
<input 
  type="hidden"
  name="maintDefectWorkofspurGearing" 
  value={maintDefectWorkofspurGearing}
  readOnly
/>
<input 
  type="hidden"
  name="maintDefectOtherElectricEquip" 
  value={maintDefectOtherElectricEquip}
  readOnly
/>
<input 
  type="hidden"
  name="maintDefectOtherPart" 
  value={maintDefectOtherPart}
/>

<input 
  type="hidden"
  name="testExamNum" 
  value={testExamNum}
/>
<input 
  type="hidden"
  name="testExamDetail" 
  value={testExamDetail}
/>
<input 
  type="hidden"
  name="testExamPersonName" 
  value={testExamPersonName}
/>

<input 
  type="hidden"
  name="annealTreatment" 
  value={annealTreatment}
/>
<input 
  type="hidden"
  name="annealPersonName" 
  value={annealPersonName}
/>
<input 
  type="hidden"
  name="particularDefectFound" 
  value={particularDefectFound}
/>
<input 
  type="hidden"
  name="repairRenewalAlteratn" 
  value={repairRenewalAlteratn}
/>

<input 
  type="hidden"
  name="certificateNum" 
  value={certificateNum}
/>
<input 
  type="hidden"
  name="declaratn" 
  value={declaratn}
/>
            

            <div className="mb-4">
                <label htmlFor="customer" className="block text-sm font-medium text-gray-700">
                    <FaUser className="inline mr-2" />
                    Select Customer:
                </label>
                <select
                    id="customer"
                    value={selectedCustomer}
                    onChange={(e) => {
                        setSelectedCustomer(e.target.value);
                        setSelectedSite('');
                    }}
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                >
                    <option value="" disabled>Select a customer</option>
                    {customers.map(customer => (
                        <option key={customer.customerId} value={customer.customerId}>
                            {customer.customerName}
                        </option>
                    ))}
                </select>
                {errors.selectedCustomer && <p className="text-red-500 text-sm">{errors.selectedCustomer}</p>}
            </div>

            {selectedCustomer && (
                <div className="mb-4">
                    <label htmlFor="site" className="block text-sm font-medium text-gray-700">
                        <FaBuilding className="inline mr-2" />
                        Select Site:
                    </label>
                    <select
                        id="site"
                        value={selectedSite}
                        onChange={(e) => setSelectedSite(e.target.value)}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    >
                        <option value="" disabled>Select a site</option>
                        {customerSites.map(site => (
                            <option key={site.siteId} value={site.siteId}>
                                {site.siteName}, {site.siteId}
                            </option>
                        ))}
                    </select>
                    {errors.selectedSite && <p className="text-red-500 text-sm">{errors.selectedSite}</p>}
                </div>
            )}

            <form onSubmit={handleAdd} className="mb-6">                     

                 <div className="mb-4">
                    <label htmlFor="examItem" className="block text-sm font-medium text-gray-700">
                        <FaClipboardList className="inline mr-2" />
                        Select Exam Item:
                    </label>
                    <select
                        id="examItem"
                        value={selectedExamItem}
                        onChange={(e) => {
                            setSelectedExamItem(e.target.value);
                            setErrors((prevErrors) => ({
                                ...prevErrors,
                                selectedExamItem: '', // Reset error when item changes
                            }));
                        }}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    >
                        <option value="" disabled>Select an exam item</option>
                        {examItems.map(item => (
                            <option key={item.itemId} value={item.itemId}>
                                {item.itemName}
                            </option>
                        ))}
                    </select>
                    {errors.selectedExamItem && <p className="text-red-500 text-sm">{errors.selectedExamItem}</p>}
                </div>

                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                    <FaPlus className="inline mr-2" />
                    Add Exam Item
                </button>
                {errors.addedItems && <p className="text-red-500 text-sm">{errors.addedItems}</p>}
            </form>

            {addedItems.length > 0 && (
                <ul className="mb-6">
                    {addedItems.map((item) => (
                        <li key={item.itemId} className="flex items-center justify-between border-b border-gray-300 py-2">
                            <span>{item.itemName}</span>
                            <button onClick={() => handleRemove(item)} className="px-2 py-1 text-red-600 hover:text-red-700">
                                <FaTrash />
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <button
                onClick={handleSubmit}
                className="w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            > Submit Inspection
            </button>
        </div>
    );
};

export default InspectnForm;
