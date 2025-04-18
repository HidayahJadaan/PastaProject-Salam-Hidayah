import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PastaService } from '../../../pasta/services/pasta.service';
import { PastaDish } from '../../../pasta/models/pasta.model';

@Component({
  selector: 'app-add-dish',
  standalone: false,
  templateUrl: './add-dish.component.html',
  styleUrl: './add-dish.component.scss',
})
export class AddDishComponent implements OnInit{
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pastasDishesService: PastaService
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  loading = false;
  errors: string[] = [];
  success = '';
  id: string | null = null;

  name = '';
  description = '';
  price = 0;
  pastaType = '';
  dietaryInfo = '';
  loadingforGet: boolean = false;

  imageFile: File | null = null;
  imagePreview: string | null = null;

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imageFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.imageFile);
    }
  }

  savePasta() {
    this.loading = true;
    this.errors = [];
    this.success = '';

    const isValid = this.pastasDishesService.validatePastaDishForm(
      this.name,
      this.description,
      this.imageFile,
      this.price,
      this.pastaType,
      this.dietaryInfo
    );

    if (!isValid) {
      this.loading = false;
      this.errors.push('Please fill in all required fields.');
      return;
    }

    // Use imagePreview as Base64 string
    const newDish: PastaDish = {
      id: ''+Math.random(),
      name: this.name,
      description: this.description,
      price: this.price,
      pastaType: this.pastaType,
      dietaryInfo: this.dietaryInfo,
      image: this.imagePreview || '',
    };

    this.pastasDishesService
      .addPastaDish(newDish)
      .then(() => {
        this.success = 'Dish added successfully!';
        this.resetForm();
      })
      .catch((err) => {
        console.error(err);
        this.errors.push('Something went wrong while saving the dish.');
      })
      .finally(() => {
        this.loading = false;
      });
  }

  resetForm() {
    this.name = '';
    this.description = '';
    this.price = 0;
    this.pastaType = '';
    this.dietaryInfo = '';
    this.imageFile = null;
    this.imagePreview = null;
  }
}
