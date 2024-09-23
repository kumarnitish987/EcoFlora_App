import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { response } from 'express';
import axios from 'axios';
import { DataPopupComponent } from '../data-popup/data-popup.component'
//
@Component({
  selector: 'app-location-selection',
  standalone: true,
  imports: [CommonModule, FormsModule, DataPopupComponent],
  templateUrl: './location-selection.component.html',
  styleUrls: ['./location-selection.component.scss']
})
export class LocationSelectionComponent {
  selectedLat: number | null = null;
  selectedLng: number | null = null;
  inputLat: number | null = null;
  inputLng: number | null = null;
  locationMethod: string = 'manual';
  imageSrc: string | null = null;
  imageFile: File | null = null;
  responseData: any = null;
  showModal: boolean = false;
  
  toggleInputFields() {
    this.selectedLat = null;
    this.selectedLng = null;
    this.inputLat = null;
    this.inputLng = null;
    this.imageSrc = null; // Reset image when changing methods
    this.imageFile = null;
  }

  updateCoordinates() {
    if (this.inputLat !== null && this.inputLng !== null) {
      this.selectedLat = this.inputLat;
      this.selectedLng = this.inputLng;
    }
  }
  SendCoordinates() {
    // Make api call to send coordinates
    if (this.inputLat !== null && this.inputLng !== null) {
    const apiUrl = 'http://127.0.0.1:5000/getPlantSuggestions';
    const requestData = {
    lat: this.inputLat,
    lon: this.inputLng
    };
    axios.post(apiUrl, requestData, {
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*' // Allow CORS
      }
  })
  .then(response => {
    // Getting response here and need to show in UI
      console.log('Response:', response);
    if(response.data){
      this.responseData = response.data;
      this.showModal = true;
    }
  })
  .catch(error => {
      console.error('Error:', error);
  });
  }
  }
  
  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.imageFile = file; // Store the file for uploading
    }
  }

  cancelImage() {
    this.imageSrc = null; // Clear the preview
    this.imageFile = null; // Clear the stored file
  }

 async uploadImage() {
    if (this.imageFile) {
      const formData = new FormData();
      formData.append('file', this.imageFile);

      try {
        const response = await axios.post('http://127.0.0.1:5000/getPlantSuggestionsUsingPicture', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',// Allow CORS
          }
        });
        console.log('File uploaded successfully', response.data);
        if(response.data){
          this.responseData = response.data;
          this.showModal = true;
        }
      } catch (error) {
        console.error('Error uploading file', error);
      }
    } else {
      console.error('No file selected');
    }
  }
  closeModal() {
    this.selectedLat = null;
    this.selectedLng = null;
    this.inputLat = null;
    this.inputLng = null;
    this.imageSrc = null; 
    this.imageFile = null;
    this.showModal = false;
  }
}
