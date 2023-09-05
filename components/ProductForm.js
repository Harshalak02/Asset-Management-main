import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "./Layout";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from "next/image";



export default function ProductForm({
    _id,
    id: existingId,
    description: existingDescription,
    price: existingPrice,
    selectedDate: existingSelectedDate,
    department: existingDepartment,
    location: existingLocation,
    serviceDate: existingServiceDate,
    supplierId: existingSupplierId,
    employeeId: existingEmployeeId,
    category: existingCategory,
    properties: assignedProperties,

    image: existingImage,
}) {
    const [id, setId] = useState(existingId || '');
    const [supplierId, setSupplierId] = useState(existingSupplierId || '');

    const [employeeId, setEmployeeId] = useState(existingEmployeeId || '');
    const router = useRouter();
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [department, setDepartment] = useState(existingDepartment || '');
    const [location, setLocation] = useState(existingLocation || '');
    const [category, setCategory] = useState(existingCategory || '');

    const [selectedDate, setSelectedDate] = useState(existingSelectedDate ? new Date(existingSelectedDate) : null);
    const [serviceDate, setServiceDate] = useState(existingServiceDate ? new Date(existingServiceDate) : null);
    const [categories, setCategories] = useState([]);
    const [goToProducts, setGoToProducts] = useState(false);
    const [productProperties, setProductProperties] = useState(assignedProperties || {});
    const [image, setImage] = useState(existingImage || '');
    useEffect(() => {
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
        })
    }, []);

    //yarn add react-datepicker
    //const [selectedDate, setSelectedDate] = useState('');

    async function saveProduct(ev) {
        ev.preventDefault();
        const data = { id, description, price, selectedDate, department, location, serviceDate, supplierId, employeeId, category, properties: productProperties, base64: image };
        if (price <= 0) {
            alert("Please Enter Valid price");
            return;
        }



        if (_id) {
            //update

            await axios.put('/api/products', { ...data, _id });
            //  setGoToProducts(true);

        }
        else {
            await axios.post('/api/products', data);
            //  setGoToProducts(true);
        }
        setGoToProducts(true);



    }
    if (goToProducts) {
        router.push('/products');
    }
    function uploadImage() {

    }

    const propertiesToFill = [];
    if (categories.length > 0 && category) {
        let catInfo = categories.find(({ _id }) => _id === category);
        propertiesToFill.push(...catInfo.properties);
        while (catInfo?.parent?._id) {
            const parentCat = categories.find(({ _id }) => _id === catInfo?.parent?._id);
            propertiesToFill.push(...parentCat.properties);
            catInfo = parentCat;
        }
    }

    function setProductProp(propName, value) {
        setProductProperties(prev => {
            const newProductProps = { ...prev };
            newProductProps[propName] = value;
            return newProductProps;
        });
    }

    function convertBase64ToImageURL(base64) {
        const imageURL = `data:image/jpeg;base64,${base64}`;
        //console.log("Image URL:", imageURL);
        return imageURL;
    }




    function renderImage() {
        if (image && image.length > 0) {
            return (
                <div className="mb-4">
                    <label>Product Image:</label>
                    <div className="flex flex-wrap gap-4">
                        <Image
                            src={convertBase64ToImageURL(image)} // Assuming the image contains the base64-encoded image
                            alt="Selected"
                            className="w-32 h-32 object-cover rounded-md"
                        />
                    </div>
                </div>
            );
        } else {
            return <div>No photos are currently available for this asset.</div>;
        }
    }



    function convertToBase64(e) {
        console.log(e);
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            console.log(reader.result);
            setImage(reader.result);

        };
        reader.onerror = error => {
            console.log("Error:".error);
        }
    }
    return (
        // <Layout>
        <form onSubmit={saveProduct}>

            <label> Asset ID</label>
            <input type="text" placeholder="product name" value={id} onChange={ev => setId(ev.target.value)} />
            <label>
                Add Category
            </label>
            <select value={category} onChange={ev => setCategory(ev.target.value)}>
                <option value="">No Category</option>
                {categories.length > 0 && categories.map(c => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                ))}
            </select>
            {propertiesToFill.length > 0 && propertiesToFill.map(p => (

                <div key={p._id} className="flex-gap-1">
                    <div>
                        {p.name[0]?.toUpperCase() + p.name?.substring(1)}
                    </div>
                    <select value={productProperties[p.name]} onChange={ev => setProductProp(p.name, ev.target.value)}>
                        {p.values.map(v => (
                            <option key={v._id} value={v}>{v}</option>
                        ))}
                    </select>
                </div>
            ))}



            <label>Description</label>
            <textarea placeholder="description" value={description} onChange={ev => setDescription(ev.target.value)} />
            <label>Price in USD</label>
            <input type="number" placeholder="price" value={price} onChange={ev => setPrice(ev.target.value)} />



            <label>
                Photos
            </label>
            <div className="mb-2">
                <label className="w-32 h-32  flex items-center justify-center gap-1 rounded-lg bg-yellow-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>

                    <div>
                        Upload</div>
                    <input type="file" className="hidden" onChange={convertToBase64} />

                </label>
                {renderImage()}

            </div>


            <div>
                {!image?.length && (
                    <div>No photos are currently available for this asset </div>
                )}
            </div>


            <label>Date of Purchase</label>
            <DatePicker
                selected={selectedDate}

                onChange={date => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select a date"


            />


            <label>Select Department</label>

            <select className=" border-2 border-yellow-500 rounded-md px-1 w-full mb-2" value={department} onChange={ev => setDepartment(ev.target.value)}>
                <option value="">Select a department</option>
                <option value="SOS">SOS</option>
                <option value="MAB">MAB</option>
                <option value="SEZ">SEZ</option>
            </select>
            <label>Select the location</label>

            <select className=" border-2 border-yellow-500 rounded-md px-1 w-full mb-2" value={location} onChange={ev => setLocation(ev.target.value)}>
                <option value="">Select a Location</option>
                <option value="Block-A">Block-A</option>
                <option value="Block-B">Block-B</option>
                <option value="Block-C">Block-C</option>
            </select>


            <label>Last Service Date</label>
            <DatePicker
                selected={serviceDate}
                onChange={date => setServiceDate(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select a date"


            />


            <label> Supplier ID</label>
            <input type="number" placeholder="Supplier ID" value={supplierId} onChange={ev => setSupplierId(ev.target.value)} />

            <label> Employee ID</label>
            <input type="number" placeholder="Employee ID" value={employeeId} onChange={ev => setEmployeeId(ev.target.value)} />


            <button type="submit" className="btn-primary">Save </button>
        </form>

        // </Layout>
    );
}