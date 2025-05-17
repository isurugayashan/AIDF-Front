import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useCreateHotelMutation } from "@/lib/api";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
 
//run time validation
const formSchema = z.object({
  name: z.string().min(2,{
    message: "Hotel Name is required",
  }),
  location: z.string().min(3),
  image: z.string().min(3),
  price: z.number().min(2),
  description: z.string().min(3)
});



const CreateHotelForm = () =>{
    const [createHotel, {isLoading}]  =  useCreateHotelMutation();
    const form = useForm({
        resolver: zodResolver(formSchema),
    });

    const handleSubmit = async (values) =>{
        
        const {name, location, image, price, description} = values;
        try {
           await toast.promise(
            createHotel({
                name,
                location,
                image,               
                price, 
                description,
               }).unwrap(),
               {
                loading: "Creating hotel..",
                success: "Hotel created successfully!",
                error: "Hotel created unsuccessfully",
              }
           ) ;   
        } catch (error) {
            console.error(error);
        }
            
    }
    // return (
    //     <Form {...form}>
    //     <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 w-1/2">
    //         <div className="grid gap-4">
    //             <FormField
    //                 control={form.control}
    //                 name="name"
    //                 render={({ field }) => (
    //                     <FormItem>
    //                     <FormLabel>Name</FormLabel>
    //                     <FormControl>
    //                         <Input placeholder="Hotel Name" {...field} />
    //                     </FormControl>
    //                     <FormMessage />
    //                     </FormItem>
    //                 )}
    //             />

    //             <FormField
    //                 control={form.control}
    //                 name="location"
    //                 render={({ field }) => (
    //                     <FormItem>
    //                     <FormLabel>Location</FormLabel>
    //                     <FormControl>
    //                         <Input placeholder="Location" {...field} />
    //                     </FormControl>
    //                     <FormMessage />
    //                     </FormItem>
    //                 )}
    //             />

    //             <FormField
    //                 control={form.control}
    //                 name="image"
    //                 render={({ field }) => (
    //                     <FormItem>
    //                     <FormLabel>Image</FormLabel>
    //                     <FormControl>
    //                         <Input placeholder="Image" {...field} />
    //                     </FormControl>
    //                     <FormMessage />
    //                     </FormItem>
    //                 )}
    //             />

    //             <FormField
    //                 control={form.control}
    //                 name="price"
    //                 render={({ field }) => (
    //                     <FormItem>
    //                     <FormLabel>Price</FormLabel>
    //                     <FormControl>
    //                         <Input type="number" placeholder="Price"  onChange={(e) =>{
    //                                 field.onChange(parseFloat(e.target.value));
    //                         }}value ={field.value } />
    //                     </FormControl>
    //                     <FormMessage />
    //                     </FormItem>
    //                 )}
    //             />

    //             <FormField
    //                 control={form.control}
    //                 name="description"
    //                 render={({ field }) => (
    //                     <FormItem>
    //                     <FormLabel>Description</FormLabel>
    //                     <FormControl>
    //                         <Textarea  placeholder="Description" {...field} />
    //                     </FormControl>
    //                     <FormMessage />
    //                     </FormItem>
    //                 )}
    //             />
    //         </div>

    //         <div className="mt-4">
    //         <Button type="submit">Create Hotel</Button>
    //         </div>
          
    //     </form>
    //   </Form>
    // )

    return (
  <Form {...form}>
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="mx-auto w-full max-w-2xl space-y-6 rounded-xl bg-white p-6 shadow-lg"
    >
      <h2 className="text-2xl font-semibold text-gray-800">Create a New Hotel</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Hotel Name" {...field} className="input-modern" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Location" {...field} className="input-modern" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="Paste hotel image URL" {...field} className="input-modern" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Price"
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  value={field.value}
                  className="input-modern"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write a short description of the hotel..."
                  {...field}
                  className="input-modern min-h-[100px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          className="w-full rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-white transition hover:opacity-90"
        >
          Create Hotel
        </Button>
      </div>
    </form>
  </Form>
);

};

export default CreateHotelForm;